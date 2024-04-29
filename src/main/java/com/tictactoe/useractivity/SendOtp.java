//package com.tictactoe.useractivity;
//
//import java.io.IOException;
//
//import java.util.Properties;
//import java.util.Random;
//
//import javax.mail.Message;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//public class SendOtp extends HttpServlet {
//	protected void doPost(HttpServletRequest request, HttpServletResponse response)
//		throws ServletException, IOException {
//		String email = request.getParameter("email");
//		String otp = generateOTP();
//		boolean otpSent = sendOtpToEmail(email, otp);
//		if (otpSent) {
//			response.getWriter().write("OTP sent successfully!");
//		} else {
//			response.getWriter().write("Failed to send OTP!");
//		}
//	}
//
//	private String generateOTP() {
//		int length = 6;
//		String numbers = "0123456789";
//		StringBuilder otp = new StringBuilder();
//		Random random = new Random();
//		for (int i = 0; i < length; i++) {
//			int index = random.nextInt(numbers.length());
//			otp.append(numbers.charAt(index));
//		}
//		return otp.toString();
//	}
//
//	private boolean sendOtpToEmail(String email, String otp) {
//		final String USERNAME = "mpsiddarthgowda@gmail.com";
//		final String PASSWORD = "zsri rouz pbng szqb";
//
//		try {
//			Properties properties = new Properties();
//			properties.put("mail.smtp.auth", "true");
//			properties.put("mail.smtp.starttls.enable", "true");
//			properties.put("mail.smtp.host", "smtp.gmail.com");
//			properties.put("mail.smtp.port", "587");
//			properties.put("mail.smtp.user", USERNAME);
//			properties.put("mail.smtp.password", PASSWORD);
//			Session session = Session.getInstance(properties);
//			Message message = new MimeMessage(session);
//			message.setFrom(new InternetAddress(USERNAME));
//			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
//			message.setSubject("Your OTP Code");
//			message.setText("Your OTP code is: " + otp);
//
//	        Transport transport = session.getTransport("smtp");
//	        transport.connect("smtp.gmail.com", USERNAME, PASSWORD);
//	        transport.sendMessage(message, message.getAllRecipients());
//	        transport.close();
//			return true;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//	}
//}
