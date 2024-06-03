import { AppBar, Toolbar, Typography, IconButton, Stack } from "@mui/material";
import { FaBookJournalWhills } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { MouseEvent } from "react";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { ListItemIcon, Divider, Menu, MenuItem } from "@mui/material";
import { Outlet } from "react-router-dom";
import useAdminStore from "../store/admin-store";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { logout, user } = useAdminStore();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/admin");
  };

  const handleLogOut = () => {
    logout();
    navigate("/signin");
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-white bg-blue-700  mx-2 px-3 py-2 rounded-md text-sm font-medium"
      : "text-white  hover:bg-gray-400  mx-2 px-3 py-2 rounded-md text-sm font-medium";

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <NavLink to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <FaBookJournalWhills />
            </IconButton>
          </NavLink>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Membership Management
          </Typography>

          <Stack direction="row" spacing={2}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/add-member" className={getLinkClass}>
              Add Member
            </NavLink>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {" "}
                  {user?.username.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfileClick}>
                <Avatar /> Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default NavBar;
