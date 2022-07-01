/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import styles from '../../../../../../assests/scss/campaign.module.scss';

interface Data {
  carbs: number;
  fat: number;
  name: string;
  posts: number;
  comments: number;
  reactions: number;
  protein: number;
  a: number;
}
function createData(
  name: string,
  posts: number,
  comments: number,
  reactions: number,
  fat: number,
  carbs: number,
  protein: number,
  a: number,
): Data {
  return {
    name,
    posts,
    comments,
    reactions,
    fat,
    carbs,
    protein,
    a,
  };
}
const rows = [
  createData('Cupcake', 4, 4, 4, 3.7, 67, 4.3, 1),
  createData('Donut', 5, 5, 5, 25.0, 51, 4.9, 0),
  createData('Eclair', 6, 6, 6, 16.0, 24, 6.0, 0),
  createData('Frozen yoghurt', 7, 7, 7, 6.0, 24, 4.0, 0),
  createData('Gingerbread', 8, 8, 8, 16.0, 49, 3.9, 0),
  createData('dsadsa', 9, 9, 9, 16.0, 49, 3.9, 0),
  createData('ffff', 3, 3, 3, 16.0, 49, 3.9, 0),
  createData('ggg', 2, 2, 2, 16.0, 49, 3.9, 0),
  createData('wwww', 1, 1, 1, 16.0, 49, 3.9, 0),
];
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  title: string;
}
interface Subtitle {
  one: string;
  two: string;
  three: string;
}
const subtitles: readonly Subtitle[] = [
  {
    one: 'Posts',
    two: 'Comments',
    three: 'Reactions',
  },
];
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Group Name',
    title: 'Members count',
  },
  {
    id: 'posts',
    numeric: true,
    disablePadding: false,
    label: 'Engagement Metrics',
    title: '',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Category Conversations',
    title: '',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Brand Mentions',
    title: '',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Hashtag Mentions',
    title: '',
  },
  {
    id: 'a',
    numeric: true,
    disablePadding: false,
    label: 'Brand SoV',
    title: '',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.id === 'name' ? (
                <span>
                  <Box sx={{ width: '120px' }}>
                    <span className={styles.head_label}>{headCell.label}</span>
                    <br />
                    <span className={styles.head_title}>{headCell.title}</span>
                  </Box>
                </span>
              ) : headCell.id === 'posts' ? (
                <span className={styles.metrics_title}>
                  {headCell.label}
                  <br />
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid
                      item
                      className={styles.posts}
                      sx={{ background: '#C9F1F3' }}
                    />
                    <Grid item className={styles.metrics_subtitle}>
                      {subtitles[0].one}
                    </Grid>
                    <Grid
                      item
                      className={styles.posts}
                      sx={{ background: '#D4EDE0' }}
                    />
                    <Grid item className={styles.metrics_subtitle}>
                      {subtitles[0].two}
                    </Grid>
                    <Grid
                      item
                      className={styles.posts}
                      sx={{ background: '#FDE5E7' }}
                    />
                    <Grid item className={styles.metrics_subtitle}>
                      {subtitles[0].three}
                    </Grid>
                  </Grid>
                </span>
              ) : headCell.id === 'fat' ? (
                <span className={styles.fat_protein}>{headCell.label}</span>
              ) : headCell.id === 'protein' ? (
                <span className={styles.fat_protein}>{headCell.label}</span>
              ) : (
                <span className={styles.brand_sov}>{headCell.label}</span>
              )}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Participation: React.FC = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [group, setGroup] = useState(true);
  const [groupSpan, setGroupSpan] = useState(
    'Breakdown of key KPIs at a group level',
  );
  const [groupSpanCancel, setGroupSpanCancel] = useState('');
  const [groupWise, setGroupWise] = useState(true);
  const [groupWiseText, setGroupWiseText] = useState('');
  const [groupWiseTextCancel, setGroupWiseTextCancel] = useState('');

  const addGroupSpan = () => {
    setGroup(false);
  };
  const changeGroupSpan = (e) => {
    setGroupSpanCancel(e.target.value);
  };
  const saveGroupSpan = () => {
    setGroupSpan(groupSpanCancel);
    setGroup(true);
  };
  const cancelGroupSpan = () => {
    setGroup(true);
  };
  const addGroupWiseText = () => {
    setGroupWise(false);
  };
  const changeGroupWiseText = (e) => {
    setGroupWiseTextCancel(e.target.value);
  };
  const saveGroupWiseText = () => {
    setGroupWiseText(groupWiseTextCancel);
    setGroupWise(true);
  };
  const cancelGroupWiseText = () => {
    setGroupWise(true);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="participation"
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Grid
            container
            sx={{ width: '820px' }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item className={styles.num}>
                  group-wise Engagement
                </Grid>
                <Grid item onClick={addGroupSpan} className={styles.edit}>
                  Edit
                </Grid>
                <Grid item onClick={addGroupSpan} sx={{ marginTop: '2px' }}>
                  <img className={styles.pen} src="/images/pen.jpg" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: '-7px' }}>
              <Switch {...label} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.span}>
          {group ? (
            <Grid item className={styles.span}>
              {groupSpan === '' ? (
                <Grid className={styles.add} onClick={addGroupSpan}>
                  + Add supporting text
                </Grid>
              ) : (
                groupSpan
              )}
            </Grid>
          ) : (
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <textarea
                    onChange={changeGroupSpan}
                    className={styles.textarea}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <button
                        className={clsx(styles.saveh, styles.button)}
                        onClick={saveGroupSpan}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelGroupSpan}
                      >
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item sx={{ width: '816px' }}>
          <Box sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440, marginBottom: '32px' }}>
              <Table stickyHeader aria-label="sticky table">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover role="checkbox" key={row.name}>
                          <TableCell id={labelId} scope="row" width={200}>
                            {row.name}
                          </TableCell>
                          <TableCell>
                            <Box
                              className={styles.metrics_item}
                              sx={{ background: 'rgba(201, 241, 243, 0.8)' }}
                            >
                              {row.posts}
                            </Box>
                            <Box
                              className={styles.metrics_item}
                              sx={{ background: 'rgba(212, 237, 224, 0.8)' }}
                            >
                              {row.comments}
                            </Box>
                            <Box
                              className={styles.metrics_item}
                              sx={{ background: 'rgba(253, 229, 231, 0.8)' }}
                            >
                              {row.reactions}
                            </Box>
                          </TableCell>
                          <TableCell align="left">{row.fat}</TableCell>
                          <TableCell align="left">{row.carbs}</TableCell>
                          <TableCell align="left">{row.protein}</TableCell>
                          <TableCell align="left">{row.a}</TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item>
          {groupWise ? (
            <div>
              {groupWiseText === '' ? (
                <Grid className={styles.add_key} onClick={addGroupWiseText}>
                  + Add supporting text
                </Grid>
              ) : (
                <>
                  <Grid item className={styles.font}>
                    {groupWiseText}
                  </Grid>
                  <Grid
                    item
                    onClick={addGroupWiseText}
                    className={styles.twoedit}
                    sx={{ marginBottom: '20px' }}
                  >
                    <img className={styles.pen} src="/images/pen.jpg" />
                    <span style={{ lineHeight: '40px' }}>Edit Text</span>
                  </Grid>
                </>
              )}
            </div>
          ) : (
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <textarea
                    onChange={changeGroupWiseText}
                    className={styles.textarea}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <button
                        className={clsx(styles.saveh, styles.button)}
                        onClick={saveGroupWiseText}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancelh, styles.button)}
                        onClick={cancelGroupWiseText}
                      >
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Participation;
