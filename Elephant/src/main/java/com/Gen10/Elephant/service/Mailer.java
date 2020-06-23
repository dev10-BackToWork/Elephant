package com.Gen10.Elephant.service;

import java.util.Properties;    
import javax.mail.*;    
import javax.mail.internet.*;

import org.springframework.stereotype.Component;  

@Component
public class Mailer {
    public static void send(final String from, final String password, String to, String sub, String msg) {
        //DELETE FOR FINAL VERSION
        return;
        // Get properties object
//        Properties props = new Properties();
//        props.put("mail.smtp.host", "smtp.gmail.com");
//        props.put("mail.smtp.socketFactory.port", "465");
//        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.port", "465");
//        // get Session
//        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(from, password);
//            }
//        });
//        // compose message
//        try {
//            MimeMessage message = new MimeMessage(session);
//            message.setContent(msg, "text/html; charset=utf-8");
//            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
//            message.setSubject(sub);
//            // send message
//            Transport.send(message);
//            System.out.println("message sent successfully");
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        }

    }

}