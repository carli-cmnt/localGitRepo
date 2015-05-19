package com.minipark.parkserver.admin.system.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.minipark.parkserver.admin.utils.DateUtils;

@Controller
@RequestMapping("/common/file")
public class FileController
{
    private final Logger log        = Logger.getLogger(getClass().getName());

    @Value("#{prop['UPLOAD_FILE_PATH']}")
    private String       uploadPath = null;

    @RequestMapping(value = "/uploadFile")
    public void uploadFile(MultipartFile myfiles, HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        if (myfiles != null)
        {
            byte[] bytes = myfiles.getBytes();
            String uploadDir = uploadPath;
            String sep = System.getProperty("file.separator");
            String prefix = DateUtils.getCurrentDate("yyyyMMddHHmmssSSS") + "_" + System.nanoTime();

            File dirPath = new File(uploadDir);
            if (!dirPath.exists())
            {
                dirPath.mkdirs();
            }
            String fileName = myfiles.getOriginalFilename();

            String newFileName = prefix + fileName.substring(fileName.lastIndexOf(".", fileName.length()));
            File uploadedFile = new File(uploadDir + sep + newFileName);
            FileCopyUtils.copy(bytes, uploadedFile);
            response.getWriter().write(newFileName);

        }
        else
        {
            response.getWriter().write("fail");
        }
    }

    @RequestMapping("/removeFile")
    public void removeFile(String fileName, HttpServletRequest request, HttpServletResponse response)
    {
    	try
        {
            fileName = new String(fileName.getBytes("ISO-8859-1"), "UTF-8");

            String uploadDir = uploadPath;
            String sep = System.getProperty("file.separator");
            String fullPath = uploadDir + sep + fileName;
            File f = new File(fullPath);
            if (f.exists())
            {
            	f.delete();
            }
            else
            {
                log.error("--------------------- 文件不存在!------------------------");
            }

        }
        catch (Exception ex)
        {
            log.error("--------------------- 文件删除错误!------------------------");
        }
    }
    @RequestMapping("/downloadFile")
    public void downloadFile(String fileName, HttpServletRequest request, HttpServletResponse response)
    {

        try
        {
            fileName = new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
            String uploadDir = uploadPath;
            String sep = System.getProperty("file.separator");
            String fullPath = uploadDir + sep + fileName;
            File f = new File(fullPath);
            if (f.exists())
            {
                response.reset();
                response.setContentType("application/octet-stream");
                response.addHeader("Content-Length", "" + f.length());
                response.addHeader("Content-Disposition", "attachment;filename=" + new String(f.getName().getBytes("gbk"), "iso-8859-1"));
                response.setHeader("Pragma", "No-cache");
                response.setHeader("Cache-Control", "no-cache");
                response.setDateHeader("Expires", 0);
                InputStream fis = new BufferedInputStream(new FileInputStream(fullPath));
                OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
                byte[] buffer = new byte[1024 * 1024];
                while (fis.read(buffer) > 0)
                {
                    toClient.write(buffer); // 输出数据
                }
                fis.close();
                toClient.flush();
                toClient.close();
            }
            else
            {
                log.error("--------------------- 文件不存在!------------------------");
            }
        }
        catch (Exception ex)
        {
            log.error("--------------------- 文件不存在!------------------------" + ex.getMessage());
        }
    }

    public String getUploadPath()
    {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath)
    {
        this.uploadPath = uploadPath;
    }

}
