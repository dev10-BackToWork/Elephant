package com.Gen10.Elephant.service;

import java.util.Properties;    
import javax.mail.*;    
import javax.mail.internet.*;

import org.springframework.stereotype.Component;  

@Component
public class Mailer {
    public static void send(final String from, final String password, String to, String sub, String msg) {
    //     // Get properties object
    //    Properties props = new Properties();
    //    props.put("mail.smtp.host", "smtp.office365.com");
    //    props.put("mail.smtp.socketFactory.port", "587");
    //    props.put("mail.smtp.starttls.enable", "true");
    //    props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
    //    props.put("mail.smtp.auth", "true");
    //    props.put("mail.smtp.port", "587");
    //    // get Session
    //    Session session = Session.getInstance(props, new javax.mail.Authenticator() {
    //        protected PasswordAuthentication getPasswordAuthentication() {
    //            return new PasswordAuthentication(from, password);
    //        }
    //    });
    //    // compose message
    //    try {
    //        MimeMessage message = new MimeMessage(session);
    //        message.setFrom(from);
    //        message.setContent(msg, "text/html; charset=utf-8");
    //        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
    //        message.setSubject(sub);
    //        // send message
    //        Transport.send(message);
    //        System.out.println("message sent successfully");
    //    } catch (MessagingException e) {
    //        throw new RuntimeException(e);
    //    }
    // }
}