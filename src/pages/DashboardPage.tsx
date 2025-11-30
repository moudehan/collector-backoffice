import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { Box, Grid, Typography } from "@mui/material";
import ChartCard from "../components/ChartCard";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Dashboard
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid>
            <StatCard icon={<EmojiPeopleIcon />} value="2500" label="Welcome" />
          </Grid>
          <Grid>
            <StatCard
              icon={<AccessTimeIcon />}
              value="123.50"
              label="Average Time"
            />
          </Grid>
          <Grid>
            <StatCard
              icon={<CloudDownloadIcon />}
              value="1,805"
              label="Collections"
            />
          </Grid>
          <Grid>
            <StatCard
              icon={<ChatBubbleOutlineIcon />}
              value="54"
              label="Comments"
            />
          </Grid>
        </Grid>
        <ChartCard />
      </Box>
    </DashboardLayout>
  );
}
