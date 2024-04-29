package com.j2ee.game.jdbc.dao;

import java.util.List;

import com.j2ee.game.jdbc.dto.UserDTO;

public interface UserDAO {
	 List<UserDTO> getUsers();
	 UserDTO getUser(String email,String password);
	 boolean getUser(String email);
	 boolean insertUser (String name,String email, String password);
	 boolean updateUser (UserDAO user);
	 boolean deleteUser (String emial);

}
