// * create user (task list)        POST
// * get existing user (task list)  GET
// * update user (task list)        PUT
// * delete user (task list)        DELETE

const API_ENDPOINT = "https://assets.breatheco.de/apis/fake/todos/user";

const createUser = async (username) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${username}`, {
      method: "POST",
      body: "[]",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (username) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (username, newList) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${username}`, {
      method: "PUT",
      body: JSON.stringify([...newList]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (username) => {
  try {
    await fetch(`${API_ENDPOINT}/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getAllUsers, getUser, updateUser, deleteUser };
