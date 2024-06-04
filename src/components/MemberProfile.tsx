import Divider from "@mui/material/Divider";
import { Box, TextField, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@mui/material";
import { useMemberStore } from "../store/member-store";
import { useEditMember } from "../hooks/useEditMember";
import { useDeleteMember } from "../hooks/useDeleteMember";
import { useGetMember } from "../hooks/useGetMember";
import { useNavigate } from "react-router-dom";
import {
  DisplayMemberEditWithAddress,
  DisplayMemberEditWithAddressType,
} from "../models/Members";

const MemberProfile = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const memberProfile = useGetMember(Number(id));

  const editMemberMutation = useEditMember();
  const handleOnSubmit = async (
    memberUpdateData: DisplayMemberEditWithAddressType,
  ) => {
    try {
      const confirmedEdit = window.confirm("Do you want to save changes?");
      if (confirmedEdit) {
        await editMemberMutation.mutateAsync(memberUpdateData);
        return navigate("/");
      }
    } catch (error) {
      console.log("error editing task", error);
    }
  };

  const deleteMemberMutation = useDeleteMember();
  const handleOnDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this member?",
      );
      if (confirmed) {
        await deleteMemberMutation.mutateAsync(Number(id));
        return navigate("/");
      }
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DisplayMemberEditWithAddressType>({
    resolver: zodResolver(DisplayMemberEditWithAddress),
  });

  if (!memberProfile) {
    return <CircularProgress />; // Or any loading indicator of your choice
  }

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
              {memberProfile.name.charAt(0)}
            </Avatar>
          </Box>
          <Box textAlign="center" marginTop={3}>
            <h1 className="text-xl">{`${memberProfile.name} Profile`}</h1>
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
                  defaultValue={memberProfile.name} // Set defaultValue using template literals
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
                  defaultValue={memberProfile.email}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>
            </Box>

            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Phone Number
            </label>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              defaultValue={memberProfile.phone}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Address
            </label>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              defaultValue={memberProfile.address}
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Status
            </label>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                // value={statusFilter}
                label="Status"
                // onChange={handleStatusChange}
                defaultValue={memberProfile.status}
                {...register("status")}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
              {errors.status && (
                <p style={{ color: "red" }}>{errors.status.message}</p>
              )}
            </FormControl>
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Expiration date
            </label>
            <Typography>
              {dayjs(memberProfile.membership_expiration).format("YYYY-MM-DD")}
            </Typography>
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Date Added
            </label>
            <Typography>
              {dayjs(memberProfile.date_added).format("YYYY-MM-DD")}
            </Typography>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="membership_expiration"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Select date"
                    value={
                      memberProfile.membership_expiration
                        ? dayjs(memberProfile.membership_expiration).subtract(
                            1,
                            "day",
                          )
                        : null
                    }
                    onChange={(value) =>
                      field.onChange(dayjs(value).format("MM-DD-YYYY"))
                    }
                    slots={{
                      textField: (textFieldProps) => (
                        <TextField
                          {...textFieldProps}
                          sx={{ width: "100%" }}
                          error={!!errors.membership_expiration}
                          helperText={errors.membership_expiration?.message}
                        />
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider> */}
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="warning"
                onClick={handleOnDelete}
              >
                Delete
              </Button>
              <Button variant="contained" type="submit" color="primary">
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

export default MemberProfile;
