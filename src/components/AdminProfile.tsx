import Divider from "@mui/material/Divider";
import { Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@mui/material";
import utc from "dayjs/plugin/utc";
import { BasicAdmin, BasicAdminSchema } from "../models/Admin";
import useAdminStore from "../store/admin-store";
import { UserInfoNoId, UserInfo } from "../interface/userTypes";
import { updateAdminProfile } from "../services/admin";

const AdminProfile = () => {
  dayjs.extend(utc);
  const { login, user } = useAdminStore();

  const BasicAdminSchemaNoEmail = BasicAdminSchema.omit({ email: true });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Omit<BasicAdmin, "email">>({
    resolver: zodResolver(BasicAdminSchemaNoEmail),
  });

  const handleOnSubmit = async (adminData: Omit<UserInfoNoId, "email">) => {
    try {
      const id = user?.id;

      if (!id) {
        console.error("User id is required but is undefined.");
        return;
      }

      const adminDataWithId: UserInfo = { ...adminData, id, email: user.email };
      const confirmed = window.confirm("Do you want to save changes?");
      if (confirmed) {
        updateAdminProfile(adminDataWithId);
        login(adminDataWithId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        marginTop={5}
        marginBottom={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box border={1} padding={5}>
          <Box display="flex" alignItems="center">
            <Avatar
              aria-label="profile"
              sx={{ mx: "auto", width: 80, height: 80, fontSize: 36 }}
            >
              {user?.username.charAt(0)}
            </Avatar>
          </Box>
          <Box textAlign="center" marginTop={3}>
            <h1 className="text-xl">{`${user?.username} Profile`}</h1>
          </Box>
          <Divider />

          <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
            <Box display="flex" gap={1}>
              <Box>
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2 mt-2"
                >
                  Name
                </label>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  defaultValue={user?.full_name} // Set defaultValue using template literals
                  {...register("full_name")}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                />
              </Box>
              <Box flex={1}>
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2 mt-2"
                >
                  Email
                </label>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={user?.email}
                  disabled={true}
                />
              </Box>
            </Box>

            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Username
            </label>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              defaultValue={user?.username}
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <Box marginTop={3}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default AdminProfile;
