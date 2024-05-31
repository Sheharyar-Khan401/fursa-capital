import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../shared/components/TextInput";
import { globalVariables } from "../../helper/globalVariables";
import { useScreenDimensions } from "../../hooks/useScreenDimension";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { LoginWithEmail } from "../../redux/api/auth";
import { deleteUser, updatePassword } from "firebase/auth";
import { useNotification } from "../../hooks/useNotification";
import { useSelector } from "react-redux";
import { PersonalInfo } from "./components/PersonalInfo";

function Settings() {
  const userProfileDropdownLinks = [
    { name: "Personal Information" },
    { name: "Change Password" },
    { name: "Delete account" },
  ];
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth.userInfo);
  const authUser = auth?.currentUser;
  const [width] = useScreenDimensions();
  const { contextHolder, openNotification } = useNotification();
  const [userDetails, setUserDetails] = useState(userInfo);
  const [dropdownName, setDropdownName] = useState("Personal Information");
  useEffect(() => {
    setUserDetails(userInfo);
  }, [userInfo]);
  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setDropdownName("Personal Information");
          }}
        >
          <Link
            // to={"/portfolio"}
            className={`text-black text-md ${dropdownName == "Personal Information"
              ? "font-bold"
              : "font-normal"
              } w-[100%] p-1 rounded inline-block`}
          >
            Personal Information
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setDropdownName("Change Password");
          }}
        >
          <Link
            // to={"/#"}
            className={`text-black text-md ${dropdownName == "Change Password" ? "font-bold" : "font-normal"
              } w-[100%] p-1 rounded inline-block`}
          >
            Change Password
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setDropdownName("Delete account");
          }}
        >
          <Link
            // to={"/#"}
            className={`text-black text-md ${dropdownName == "Delete account" ? "font-bold" : "font-normal"
              } w-[100%] p-1 rounded inline-block`}
          >
            Delete account
          </Link>
        </div>
      ),
    },
  ];

  const DeleteAccount = () => {
    const [password, setPassword] = useState("")
    const [deleting, setDeleting] = useState(false)
    const handleDeleteUser = async () => {
      const user = authUser;
      const payload = {
        email: user.email,
        password: password,
      };
      const data = {
        ...payload,
      };
      try {
        setDeleting(true)
        await LoginWithEmail(
          data,
          async (data) => {
            deleteUser(user).then(() => {
              console.log("User deleted !");
            })
              .catch((err) => {
                console.log(err);
              });
            openNotification(
              "success",
              "User deleted",
              "Your user has been deleted. We are sorry to see you go 😔"
            );
            setPassword("");
            setDeleting(false)
            await auth.signOut()
            navigate("/login")
          },
          (error) => {
            console.log(error);
            openNotification(
              "error",
              "Something went wrong",
              "The password you provided doesn't match any user"
            );
            setPassword("")
            setDeleting(false)
          }
        );
      } catch (e) {
        openNotification(
          "error",
          "Error",
          "Something went wrong, please try again"
        );
        console.error("Error adding document: ", e);
        setPassword("")
        setDeleting(false)
      }
    };

    return (
      <div>
        <p className="text-[35px] pb-4">Sorry to see you go! </p>
        <p className="text-[#888893] pb-2 lg:max-w-[350px]">
          For your security, please enter your current password to confirm
          account deletion.
        </p>
        <TextInput
          name="password"
          width="lg:w-[320px]"
          placeholder={globalVariables.password}
          bold="font-bold"
          value={password}
          setValue={(title, value) => setPassword(value)}
        />
        <div
          role="button"
          onClick={() => handleDeleteUser()}
          className="px-8 py-2 bg-[#000000] inline-block rounded-md text-white font-medium my-5"
        >
          {deleting ? "Deleting..." : globalVariables.DeleteBtn}
        </div>
      </div>
    );
  };
  const ForgetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
      e.preventDefault();
      if (newPassword === confirmPass) {
        setLoading(true);
        const payload = {
          email: auth.currentUser.email,
          password: currentPassword,
        };
        const user = {
          ...payload,
        };
        try {
          await LoginWithEmail(
            user,
            async (data) => {
              // navigate("/companies");
              updatePassword(auth.currentUser, "Test1234")
                .then(() => {
                  console.log("password updated successfully !");
                })
                .catch((err) => {
                  console.log(err);
                });
              setLoading(false);
              openNotification(
                "success",
                "Password updated",
                "Your password has been changed successfully"
              );
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            },
            (error) => {
              console.log(error, "----");
              openNotification(
                "error",
                "Something went wrong",
                "The credentials you provided doesn't match any user"
              );
              setLoading(false);
            }
          );
        } catch (e) {
          openNotification(
            "error",
            "Error",
            "Something went wrong, please try again"
          );
          console.error("Error adding document: ", e);
          setLoading(false);
        }
      } else {
        openNotification(
          "error",
          "Password mismatch",
          "Your password doesn't match"
        );
      }
    };

    return (
      <form onSubmit={(e) => handleUpdatePassword(e)}>
        <TextInput
          // register={register}
          name="newPassword"
          className="lg:w-[320px] w-full"
          label={globalVariables.newPassword}
          placeholder={globalVariables.newPassword}
          bold="font-bold"
          value={newPassword}
          setValue={(title, value) => setNewPassword(value)}
        />
        <br />
        <TextInput
          // register={register}
          name="confirmPassword"
          className="lg:w-[320px] w-full"
          label={globalVariables.confirmPassword}
          placeholder={globalVariables.confirmPassword}
          bold="font-bold"
          value={confirmPass}
          setValue={(title, value) => setConfirmPassword(value)}
        />
        <br />
        <TextInput
          // register={register}
          name="currentPassword"
          value={currentPassword}
          className="lg:w-[320px] w-full"
          label={globalVariables.currentPassword}
          placeholder={globalVariables.currentPassword}
          bold="font-bold"
          setValue={(title, value) => setCurrentPassword(value)}
        />
        <button
          type="submit"
          className="px-16 py-2 bg-[#58b5ac] inline-block rounded-md text-white font-medium my-8 w-full lg:w-[320px] align-middle text-center cursor-pointer"
        >
          {loading ? "updating..." : globalVariables.UpdateBtn}
        </button>
      </form>
    );
  };

  return (
    <div className="px-5 sm:px-[12.5%]">
      {contextHolder}
      <div className="flex space-x-10 lg:py-14">
        {width > 1024 && (
          <div className="w-[16rem]">
            <ul>
              {userProfileDropdownLinks.map((menuItem, index) => (
                <li
                  className="px-4 py-[8px] border-b place hover:text-[#58b5ac] font-bold text-xl border-[#eeee] cursor-pointer"
                  key={index}
                >
                  <div
                    onClick={() => setDropdownName(menuItem.name)}
                    className="text-black text-lg font-normal"
                  >
                    {menuItem.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-[35rem] m-auto lg:m-0">
          {width < 1024 && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Space className="w-full h-11 justify-between px-3 border border-1 rounded-lg my-6 py-1">
                  {dropdownName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
          {dropdownName == "Personal Information" ? (
            <PersonalInfo
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          ) : dropdownName == "Change Password" ? (
            <ForgetPassword />
          ) : (
            <DeleteAccount />
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
