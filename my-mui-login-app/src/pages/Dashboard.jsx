import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider, Grid, Paper, IconButton, Avatar } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import "../styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Placeholder User Data
  const user = {
    name: "Jake W.",
    avatar: "https://i.pravatar.cc/300", // Example profile picture
  };

  // State for Chart Data & Cards
  const [users, setUsers] = useState(0);
  const [sales, setSales] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setUsers(Math.floor(Math.random() * 5000) + 1000);
    setSales(Math.floor(Math.random() * 50000) + 10000);
    setTasks(Math.floor(Math.random() * 200) + 50);
    setRevenueGrowth(Math.floor(Math.random() * 20) + 5);

    // Mock Chart Data
    setLineChartData([
      { name: "Jan", sales: Math.random() * 1000 + 500, profit: Math.random() * 500 + 200 },
      { name: "Feb", sales: Math.random() * 1000 + 600, profit: Math.random() * 500 + 300 },
      { name: "Mar", sales: Math.random() * 1000 + 800, profit: Math.random() * 500 + 450 },
      { name: "Apr", sales: Math.random() * 1000 + 1000, profit: Math.random() * 500 + 500 },
      { name: "May", sales: Math.random() * 1000 + 1200, profit: Math.random() * 500 + 700 },
    ]);

    setBarChartData([
      { name: "Product A", sales: Math.floor(Math.random() * 3000) },
      { name: "Product B", sales: Math.floor(Math.random() * 3000) },
      { name: "Product C", sales: Math.floor(Math.random() * 3000) },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" open={drawerOpen} className="sidebar" sx={{ width: drawerOpen ? 150 : 60, 
        transition: "width 0.3s", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between" }}>
        <Box>
          <Toolbar>
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="Dashboard" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="Users" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon><BarChartIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="Analytics" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="Tasks" />}
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="Settings" />}
            </ListItem>
          </List>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2, position: "absolute", bottom: 20, left: drawerOpen ? 20 : "50%", transform: drawerOpen ? "none" : "translateX(-50%)" }}>
          <Avatar src={user.avatar} sx={{ bgcolor: "#1976d2" }}>
            {!user.avatar && <AccountCircleIcon />}
          </Avatar>
          {drawerOpen && <Typography variant="body1">{user.name}</Typography>}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, transition: "margin-left 0.3s", ml: drawerOpen ? "240px" : "80px" }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerOpen ? 180 : 80}px)`, ml: drawerOpen ? "240px" : "80px", transition: "width 0.3s" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{users}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">${sales.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Active Tasks</Typography>
              <Typography variant="h4">{tasks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Revenue Growth</Typography>
              <Typography variant="h4">+{revenueGrowth}%</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" align="center">Monthly Sales & Profit</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" align="center">Top Products Sales</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
