import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { supabase } from "../supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AdminLogIn, AdminLogInSchema } from "../models/Admin";
import useAdminStore from "../store/admin-store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchAdminProfile } from "../services/admin";
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const { login } = useAdminStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLogIn>({
    resolver: zodResolver(AdminLogInSchema),
  });

  //fetch admin profile
  const adminProfile = async (email: string) => {
    try {
      const response = await fetchAdminProfile(email);
      login(response);
      return true;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      return false;
    }
  };

  const handleOnSubmit = async (adminData: AdminLogIn) => {
    try {
      const { email, password } = adminData;
      // Perform login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        throw new Error(error.message);
      }

      const adminStoreData = {
        id: data.user?.id + "",
        email: email,
      };

      adminProfile(adminStoreData.email);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://thumbs.dreamstime.com/b/membership-text-concept-blue-background-world-map-social-icons-membership-108922806.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errorMessage && (
                  <Typography variant="body2" color="error" align="center">
                    {errorMessage}
                  </Typography>
                )}

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
