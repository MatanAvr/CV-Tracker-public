import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type WelcomeProps = { saveNewUser: () => void };

const Welcome = ({ saveNewUser }: WelcomeProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      p={2}
    >
      <Card sx={{ minWidth: 275, maxWidth: 350, textAlign: "center", p: 1.5 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            CV-Tracker
          </Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            A convenient way to track your job applications
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={saveNewUser}>
            Start
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Welcome;
