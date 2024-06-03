import { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Typography, Avatar, Button } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const HomePage = () => {
  const members = [
    {
      name: "Alice Johnson",
      status: "active",
      email: "alice.johnson@example.com",
    },
    {
      name: "Bob Smith",
      status: "pending",
      email: "bob.smith@example.com",
    },
    {
      name: "Charlie Brown",
      status: "inactive",
      email: "charlie.brown@example.com",
    },
    {
      name: "Diana Prince",
      status: "active",
      email: "diana.prince@example.com",
    },
    {
      name: "Evan Daniels",
      status: "pending",
      email: "evan.daniels@example.com",
    },
    {
      name: "Fiona Apple",
      status: "inactive",
      email: "fiona.apple@example.com",
    },
    {
      name: "George Martin",
      status: "active",
      email: "george.martin@example.com",
    },
    {
      name: "Hannah Montana",
      status: "pending",
      email: "hannah.montana@example.com",
    },
    {
      name: "Ian McKellen",
      status: "inactive",
      email: "ian.mckellen@example.com",
    },
    {
      name: "Judy Garland",
      status: "active",
      email: "judy.garland@example.com",
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  // Event handler for changes in the search input
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: 10 }}
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
              // value={statusFilter}
              label="Status"
              // onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          component="div"
          gap={4}
          p={2}
          display="flex"
          width={1300}
          sx={{
            flexWrap: "wrap",
            paddingLeft: 15,
          }}
        >
          {members.map((profile, index) => (
            <Card key={index}>
              <CardHeader
                avatar={
                  <Avatar aria-label="profile">{profile.name.charAt(0)}</Avatar>
                }
                title={profile.name}
                subheader={`Status: ${profile.status}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Email: {profile.email}
                </Typography>
              </CardContent>
              <CardContent>
                <Button variant="contained" color="primary" fullWidth>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
