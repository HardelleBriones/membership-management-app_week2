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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicAdminSginUpSchema, BasicAdminSginUp } from "../models/Admin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { NavLink } from "react-router-dom";
export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BasicAdminSginUp>({
    resolver: zodResolver(BasicAdminSginUpSchema),
  });

  const handleOnSubmit = async (adminData: BasicAdminSginUp) => {
    if (adminData.password !== adminData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return; // Early return to prevent further execution
    }

    const { email, password } = adminData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      throw new Error(error.message);
    }

    const profileData = {
      id: data.user?.id,
      username: adminData.username,
      full_name: adminData.full_name,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(profileData)
      .single();

    if (profileError) {
      setErrorMessage(profileError.message);
      throw new Error(profileError.message);
    }
    navigate("/login");
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
                "url(https://source.unsplash.com/random?wallpapers)",
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
            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
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
                  Sign Up
                </Typography>

                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  {...register("full_name")}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                  autoComplete="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {errorMessage && (
                  <Typography variant="body2" color="error" align="center">
                    {errorMessage}
                  </Typography>
                )}
                <FormControlLabel
                  control={<Checkbox value="agreeTerms" color="primary" />}
                  label="I agree to the terms"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NavLink to="/signin" className="text-blue-700">
                      Already have an account? Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
