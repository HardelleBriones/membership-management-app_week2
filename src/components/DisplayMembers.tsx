import { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Typography, Avatar, Button } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemberStore } from "../store/member-store";
import { SelectChangeEvent } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TbFaceIdError } from "react-icons/tb";
import useAdminStore from "../store/admin-store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DisplayMembers = () => {
  type StatusType = "Active" | "Pending" | "Inactive" | "Suspended" | "";
  const [status, setStatus] = useState<StatusType>("");
  const [searchValue, setSearchValue] = useState("");

  const { fetchMembers } = useMemberStore();
  const membersQuery = fetchMembers(status);

  const navigate = useNavigate();
  const { user } = useAdminStore();
  if (!user) {
    navigate("/signin");
  }

  // Event handler for changes in the search  input
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<StatusType>) => {
    setStatus(event.target.value as StatusType);
  };

  // Filter members based on search value
  const filteredMembers = membersQuery.data?.filter((member) =>
    member.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={10}
      >
        <Box component="div" display="flex" alignItems="center">
          <input
            id="searchInput"
            type="text"
            placeholder="Search here"
            className="w-96 h-12 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchValue}
            onChange={handleSearchInputChange}
          />

          {/* <p className="text-lg text-gray-700">Search Term: {searchValue}</p> */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={status}
              label="Status"
              onChange={handleStatusChange}
              defaultValue=""
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          component="div"
          gap={4}
          p={2}
          display="flex"
          width={1300}
          marginLeft={10}
          sx={{
            flexWrap: "wrap",
            paddingLeft: 15,
          }}
        >
          {membersQuery.isLoading ? (
            <Box component="div" marginLeft={50} marginTop={15}>
              <CircularProgress size={100} />
              <span className="mt-4 text-xl">Loading...</span>
            </Box>
          ) : membersQuery.isError ? (
            <Box marginLeft={50}>
              <TbFaceIdError size={100} />
              <span className="mt-4 text-xl">
                Error: {JSON.stringify(membersQuery.error)}
              </span>
            </Box>
          ) : filteredMembers && filteredMembers.length > 0 ? (
            filteredMembers.map((profile) => (
              <Card key={profile.id}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="profile">
                      {profile.name.charAt(0)}
                    </Avatar>
                  }
                  title={profile.name}
                  subheader={`Status: ${profile.status}`}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Email: {profile.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Phone: {profile.phone}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Link
                    to={`/members/${profile.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      // onClick={() => handleOpenProfile(profile)}
                    >
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box component="div" marginLeft={50}>
              <span className="mt-4 text-xl">No members found</span>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DisplayMembers;
