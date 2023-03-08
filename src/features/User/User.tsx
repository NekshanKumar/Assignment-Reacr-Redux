import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUser, IUserList } from "../../models/user";
import { RootState, useAppDispatch } from "../../store";
import {
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers,
} from "./userApi";
import moment from "moment";
import { Input, Button } from "../../components";
import { toast, ToastContainer } from "react-toastify";

export const User: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userList = useSelector(
    (state: RootState) => state.users.list.values
  );
  const isLoadingTable = useSelector(
    (state: RootState) => state.users.list.isLoading
  );
  const isSaving = useSelector(
    (state: RootState) => state.users.save.isSaving
  );
  const isDeleting = useSelector(
    (state: RootState) => state.users.save.isDeleting
  );

  const [user, setUser] = useState<IUser>({
    id: "",
    firstName:"",
    lastName: "",
    phoneNumber: "",
    age: "",
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const selectUser = (d: IUser) => {
    setShowValidation(false);
    setUser({
      id: d.id,
      firstName: d.firstName,
      lastName: d.lastName,
      phoneNumber: d.phoneNumber,
      age: d.age
    });
  };

  const removeUser = (id: string) => {
    if (id)
      dispatch(deleteUsers(id))
        .unwrap()
        .then((response) => {
          toast.success(response);
          dispatch(getUsers());
        })
        .catch((error) => {
          toast.error(error);
        });
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (user.firstName === "") {
      setShowValidation(true);
      return;
    }

    const action =
      user.id === ""
        ? addUsers(user)
        : updateUsers(user);

    dispatch(action)
      .unwrap()
      .then((response) => {
        toast.success(response);
        resetForm();
        dispatch(getUsers());
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const resetForm = () => {
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
    });
    setShowValidation(false);
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title">
          User &nbsp;
          <span className="tag is-link">{userList?.length}</span>
        </h1>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  
                </div>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <Input
                    type="text"
                    title="First Name"
                    name="firstName"
                    placeholder="Enter first name here"
                    value={user.firstName}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>
                <div className="column is-4">
                  <Input
                    type="text"
                    title="Last Name"
                    name="lastName"
                    placeholder="Enter last name here"
                    value={user.firstName}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>

                <div className="column is-4">
                  <Input
                    type="text"
                    title="Phone Number"
                    name="phoneNumber"
                    placeholder="Enter phone number here"
                    value={user.phoneNumber}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>

                <div className="column is-4">
                  <Input
                    type="text"
                    title="Age"
                    name="age"
                    placeholder="Enter age here"
                    value={user.age}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>

              </div>
              <Button
                type="is-success"
                loading={isSaving}
                title="Submit"
                onClick={submit}
                disabled={isSaving || isDeleting}
              />
              &nbsp;
              {user.id !== "" && (
                <Button
                  title="Cancel"
                  onClick={resetForm}
                  disabled={isSaving || isDeleting}
                />
              )}
              <hr />
              {isLoadingTable && (
                <div className="has-text-centered">Fetching...</div>
              )}
              <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                    <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList?.map((d: IUserList, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{d.firstName}</td>
                          <td>{d.lastName}</td>
                          <td>{d.phoneNumber}</td>
                          <td>{d.age}</td>
                          <td>
                            <Button
                              type="is-warning"
                              title="Edit"
                              onClick={() => selectUser(d)}
                              disabled={isSaving || isDeleting}
                            />
                            &nbsp;
                            <Button
                              type="is-danger"
                              title="Delete"
                              loading={isDeleting}
                              onClick={() => removeUser(d.id)}
                              disabled={isSaving || isDeleting}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer closeOnClick={true} />
      </div>
    </>
  );
};
