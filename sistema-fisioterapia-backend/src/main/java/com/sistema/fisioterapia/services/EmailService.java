package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.EmailValues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    TemplateEngine templateEngine;

    @Value("${mail.urlFront}")
    private String urlFront;


    public void sendEmailTemplate(EmailValues emailValues){
        MimeMessage message = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            Context context = new Context();

            Map<String, Object> model = new HashMap<>();
            model.put("userName", emailValues.getUserName());
            model.put("url", urlFront + emailValues.getToken());

            context.setVariables(model);

            String htmlText = templateEngine.process("email-template", context);
            helper.setFrom(emailValues.getMailFrom());
            helper.setTo(emailValues.getMailTo());
            helper.setSubject(emailValues.getSubject());
            helper.setText(htmlText, true);
            javaMailSender.send(message);
        }catch (MessagingException e){
            e.printStackTrace();
        }
    }

}
