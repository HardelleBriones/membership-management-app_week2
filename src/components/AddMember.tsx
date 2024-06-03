import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { addMember } from "../services/members";
import { useQueryClient } from "@tanstack/react-query";
import {
  MemberFormSchemaWithAddress,
  MemberFormWithAddress,
} from "../models/Members";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../store/admin-store";
const AddMember = () => {
  const navigate = useNavigate();

  // Query client
  const queryClient = useQueryClient();

  const { user } = useAdminStore();

  if (!user) {
    navigate("/signin");
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MemberFormWithAddress>({
    resolver: zodResolver(MemberFormSchemaWithAddress),
  });

  // Mutation to add a new member
  const newMemberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const handleOnSubmit = async (newMember: MemberFormWithAddress) => {
    try {
      await newMemberMutation.mutateAsync(newMember);
      return navigate("/");
    } catch (error) {
      console.log("error adding task", error);
    }
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 10 }}
      >
        <Box
          width={400} // Define the width of the square
          bgcolor="#f5f5f5" // Light grey background color
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          p={5}
          borderRadius={2}
          boxShadow={3}
        >
          <h1>Add New Member</h1>
          <Divider />
          <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2 mt-4"
            >
              Name
            </label>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
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
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
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
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
                {...register("status")}
                defaultValue=""
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="membership_expiration"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Select date"
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
            </LocalizationProvider>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ mt: 2, alignSelf: "center" }} // Margin top to separate the button from the text fields
            >
              Add Member
            </Button>
          </form>
        </Box>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default AddMember;
