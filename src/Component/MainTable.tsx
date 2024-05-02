import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Grid, IconButton, Link, Paper, Typography } from "@mui/material";
import { tableColumns } from "../Consts/Const";
import { TableDataProps } from "../Types/Types";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

type mainTableProp = {
  data: TableDataProps;
  deleteHandler: (idToDelete: string) => void;
  editHandler: (idToEdit: string) => void;
};

export default function MainTable({
  data,
  deleteHandler,
  editHandler,
}: mainTableProp) {
  const actionsButtons = [
    {
      icon: <EditRoundedIcon color="primary" fontSize="small" />,
      function: (id: string) => editHandler(id),
    },
    {
      icon: <DeleteRoundedIcon color="primary" fontSize="small" />,
      function: (id: string) => deleteHandler(id),
    },
  ];
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Table size="small" stickyHeader={true}>
          <TableHead>
            <TableRow>
              {tableColumns.map((column, index) => {
                return (
                  <TableCell key={`table-cell-${index}`}>
                    <Typography fontWeight={"bold"}>{column}</Typography>
                  </TableCell>
                );
              })}
              <TableCell key={`table-cell-actions`}>
                <Typography textAlign={"center"} fontWeight={"bold"}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={`row-${index}`}>
                <TableCell sx={{ width: 120 }}>{row.date}</TableCell>
                <TableCell sx={{ width: 120 }}>{row.company}</TableCell>
                <TableCell sx={{ width: 120 }}>{row.role}</TableCell>
                <TableCell sx={{ width: 80 }}>
                  {row.link ? (
                    <Link href={row.link} target="_blank" variant="body2">
                      Link
                    </Link>
                  ) : (
                    <></>
                  )}
                </TableCell>
                <TableCell sx={{ width: 180 }}>{row.status}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>
                  <Box key={`actions-box-${index}`} display={"flex"}>
                    {actionsButtons.map((action, index) => {
                      return (
                        <IconButton
                          key={`action-button-${index}`}
                          onClick={() => action.function(row.id)}
                        >
                          {action.icon}
                        </IconButton>
                      );
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}
