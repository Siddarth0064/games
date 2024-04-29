package com.j2ee.game.jdbc.connect;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ConnectToJDBC {
	static Connection con = null;
//	static String url ="jdbc:mysql://localhost:3306/sqltraining/tictactoe";
//	static String userName = "root";
//	static String passWord = "admin";
	
	static public Connection requestConnection() throws ClassNotFoundException,SQLException, NamingException{
		Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:/comp/env");
        DataSource dataSource = (DataSource) envContext.lookup("jdbc/tictactoe");
        con = dataSource.getConnection();
        return con;
	}
}
