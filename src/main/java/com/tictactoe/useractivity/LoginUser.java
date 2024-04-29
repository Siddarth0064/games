package com.tictactoe.useractivity;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j2ee.game.jdbc.dao.UserDAO;
import com.j2ee.game.jdbc.dao.UserDAOImplement;
import com.j2ee.game.jdbc.dto.UserDTO;

public class LoginUser extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String userName = req.getParameter("name");
		String userEmail = req.getParameter("email");
		String userPasswprd = req.getParameter("password");
		
	     UserDAOImplement userDAO = new UserDAOImplement();
	     
	     UserDTO user = userDAO.getUser(userEmail, userPasswprd);
	     
	     resp.setContentType("text/html");
	     PrintWriter writer = resp.getWriter();
	     
	     
	     
	     if (user==null) {
	    	 writer.print("<h3> Invalid User Details</h3>");
	    	 
	     }
	     writer.print("<h3> WelCome to GameWorld</h3>");
	     
		
	}
	
	
}
