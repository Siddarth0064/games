package com.tictactoe.useractivity;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j2ee.game.jdbc.dao.UserDAOImplement;

public class NewAccount extends HttpServlet {
	
	
	    @Override
	    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	        // You can handle GET requests here, if needed
	    }
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("dopost function involked");
		String userName = req.getParameter("name");
		String userEmail = req.getParameter("email");
		String userPasswprd = req.getParameter("password");
		
	     UserDAOImplement userDAO = new UserDAOImplement();
	     System.out.println("insert method called");
	     boolean user = userDAO.insertUser( userName,userEmail, userPasswprd);
	     
	     resp.setContentType("text/html");
	     PrintWriter writer = resp.getWriter();
	     
	     RequestDispatcher dispatcher = req.getRequestDispatcher("login.html");
	    

	     
	     if (user) {
	    	 writer.println("<h3>Welcome, " + userName + "! Your account has been successfully created.</h3>");
	            writer.println("<h3>Please <a href=\"login.html\">login</a> here.</h3>");
	    	 
	     }else {
	    	 writer.println("<h3>Failed to create new account! Please try again.</h3>");
	            //RequestDispatcher dispatcher = req.getRequestDispatcher("login.html");
	            dispatcher.include(req, resp);
	     } 
	}

}
