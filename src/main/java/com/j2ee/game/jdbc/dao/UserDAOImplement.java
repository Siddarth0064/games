package com.j2ee.game.jdbc.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import com.j2ee.game.jdbc.connect.ConnectToJDBC;
import com.j2ee.game.jdbc.dto.UserDTO;

public class UserDAOImplement implements UserDAO {

	@Override
	public List<UserDTO> getUsers() {
		List<UserDTO> userList = null;
		try {
			Connection reqCon = ConnectToJDBC.requestConnection();
			String query = "select * from tictactoe";
			Statement stment = reqCon.createStatement();
			ResultSet exQuery = stment.executeQuery(query);

			userList = new ArrayList<UserDTO>();

			while (exQuery.next()) {
				int id = exQuery.getInt(1);
				String name = exQuery.getString(2);
				String email = exQuery.getString(3);
				String password = exQuery.getString(4);

				UserDTO user = new UserDTO(id, name, email, password);
				userList.add(user);

			}

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userList;
	}

	@Override
	public UserDTO getUser(String email, String password) {
		UserDTO user = null;
		Connection reqCon = null;
		PreparedStatement preStment = null;
		ResultSet exQuery = null;

		try {
			reqCon = ConnectToJDBC.requestConnection();
			String query = "SELECT id, name, email, password FROM tictactoe WHERE email = ? AND password = ?";
			preStment = reqCon.prepareStatement(query);
			preStment.setString(1, email);
			preStment.setString(2, password);

			exQuery = preStment.executeQuery();

			if (exQuery.next()) { // Check if ResultSet has next row
				int userId = exQuery.getInt(1);
				String userName = exQuery.getString(2);
				String userEmail = exQuery.getString(3);
				String userPassword = exQuery.getString(4);

				user = new UserDTO(userId, userName, userEmail, userPassword);
			}

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		} finally {
			try {
				if (exQuery != null) {
					exQuery.close();
				}
				if (preStment != null) {
					preStment.close();
				}
				if (reqCon != null) {
					reqCon.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return user;
	}

	@Override
	public boolean insertUser(String name, String email, String password) {
		int exQuery = 0;
		Connection reqCon = null;
		System.out.println("function callled");
		try {
			reqCon = ConnectToJDBC.requestConnection();
			PreparedStatement preStment = reqCon
					.prepareStatement("INSERT INTO tictactoe (name, email, password) VALUES (?, ?, ?)");
			preStment.setString(1, name);
			preStment.setString(2, email);
			preStment.setString(3, password);

			exQuery = preStment.executeUpdate();
			// No commit here

		} catch (ClassNotFoundException | SQLException e) {
			if (reqCon != null) {
				try {
					reqCon.rollback();
				} catch (SQLException rollbackException) {
					rollbackException.printStackTrace();
				}
			}
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		} finally {
			if (reqCon != null) {
				try {
					// Commit the transaction if no exception occurred during execution
					if (exQuery == 1) {
						reqCon.commit();
					} else {
						// Rollback the transaction if the execution failed
						reqCon.rollback();
					}
				} catch (SQLException commitException) {
					commitException.printStackTrace();
				}
				try {
					reqCon.close();
				} catch (SQLException closeException) {
					closeException.printStackTrace();
				}
			}
		}

		if (exQuery == 1) {
			System.out.println("Data inserted successfully");
		} else {
			System.out.println("Failed to insert data");
		}
		return exQuery == 1;
	}

	@Override
	public boolean updateUser(UserDAO user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteUser(String emial) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean getUser(String email) {
		UserDTO user = null;
		Connection reqCon = null;
		PreparedStatement preStment = null;
		ResultSet exQuery = null;

		try {
			reqCon = ConnectToJDBC.requestConnection();
			String query = "SELECT id, name, email, password FROM tictactoe WHERE email = ? ";
			preStment = reqCon.prepareStatement(query);
			preStment.setString(1, email);

			exQuery = preStment.executeQuery();

			if (exQuery.next()) { // Check if ResultSet has next row
				int userId = exQuery.getInt(1);
				String userName = exQuery.getString(2);
				String userEmail = exQuery.getString(3);
				String userPassword = exQuery.getString(4);
                
				if (email.equals(userEmail)) {
					return true;
					
				}
				
				
				user = new UserDTO(userId, userName, userEmail, userPassword);
			}

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		} finally {
			try {
				if (exQuery != null) {
					exQuery.close();
				}
				if (preStment != null) {
					preStment.close();
				}
				if (reqCon != null) {
					reqCon.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return false;

	}

}
