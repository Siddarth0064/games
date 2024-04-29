package com.tictactoe.useractivity;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j2ee.game.jdbc.dao.UserDAOImplement;
import com.j2ee.game.jdbc.dto.UserDTO;


public class UserLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String userEmail = req.getParameter("email");
		String userPasswprd = req.getParameter("password");
		
	     UserDAOImplement userDAO = new UserDAOImplement();
	     
	     UserDTO user = userDAO.getUser( userEmail, userPasswprd);
	     
	     resp.setContentType("text/html");
	     PrintWriter writer = resp.getWriter();
	     
	     RequestDispatcher dispatcher1 = req.getRequestDispatcher("login.html");
	     RequestDispatcher dispatcher2 = req.getRequestDispatcher("homepage.html");
	    

	     
	     if (user==null) {
	    	 writer.print("<h3> Invalid User Details</h3>");
	    	 dispatcher1.include(req, resp);
	    	 
	     }
	     writer.print("<h3> WelCome to GameWorld  " + user.getName()+"</h3>");
	     dispatcher2.include(req, resp);
	}
	
	
}
