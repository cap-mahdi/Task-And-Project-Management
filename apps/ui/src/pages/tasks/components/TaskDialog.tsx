import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Project, Status, User } from '../../../__generated__/graphql';
import { useParams } from 'react-router-dom';
import { useCustomLazyQuery } from '../../../hooks/useCustomLazyQuery';
import { GET_PROJECTS_WITH_WORKSPACE } from '../../../services/project/projectQueries';
import { RxCross2 } from 'react-icons/rx';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_TASK } from '../../../services/task/taskMutations';
import { useCustomMutation } from '../../../hooks/useCustomMutation';
import useEvent from '../../../hooks/useEvent';
import { log } from 'console';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  status: Status;
}
export const TaskDialog: FC<TaskDialogProps> = ({
  open,
  onClose,
  status: firstStatus,
}) => {
  const { projectId, sprintId } = useParams();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | undefined
  >(undefined);
  const [emitCreateTask] = useEvent(['CREATE_TASK']);

  console.log('selectedProjectIndex', selectedProjectIndex);
  console.log('projects', projects);

  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<
    number | undefined
  >(undefined);

  const [assignees, setAssignees] = useState<User[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<Status>(firstStatus);

  const [loadProjects] = useCustomLazyQuery(GET_PROJECTS_WITH_WORKSPACE, false);
  const [createTask, { data: addData }] = useCustomMutation(CREATE_TASK, true);

  useEffect(() => {
    loadProjects().then((res) => {
      setProjects(res.data.projects);
    });
  }, []);

  useEffect(() => {
    if (addData) {
      console.log('addData', addData);
      emitCreateTask();
    }
  }, [addData]);

  useEffect(() => {
    if (!projects) {
      setSelectedProjectIndex(undefined);
      return;
    }
    let newProjectIndex = 0;
    if (projectId) {
      newProjectIndex =
        projects?.findIndex((project) => project.id === projectId) ?? 0;
    }
    setSelectedProjectIndex(newProjectIndex);
  }, [projectId, projects, sprintId]);

  useEffect(() => {
    if (!projects || selectedProjectIndex === undefined) {
      setSelectedMilestoneIndex(undefined);
      return;
    }
    const milestones = projects[selectedProjectIndex]?.milestones;

    if (milestones?.length === 0) {
      setSelectedMilestoneIndex(undefined);
      return;
    }

    let newMilestoneIndex = 0;
    if (sprintId) {
      newMilestoneIndex =
        milestones?.findIndex((milestone) => milestone.id === sprintId) ?? 0;
    }
    setSelectedMilestoneIndex(newMilestoneIndex);
  }, [selectedProjectIndex, sprintId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!title || !description || !status) {
            return;
          }
          if (
            !projects ||
            selectedProjectIndex === undefined ||
            selectedMilestoneIndex === undefined
          ) {
            return;
          }
          console.log(
            'assignees to send',
            assignees.map((a) => a.id)
          );
          createTask({
            variables: {
              input: {
                name: title,
                description,
                status,
                tags,
                assignees: assignees.map((a) => a.id),
              },
              milestoneId:
                projects[selectedProjectIndex]?.milestones[
                  selectedMilestoneIndex
                ]?.id,
            },
          });
          onClose();
        },
      }}
    >
      <DialogTitle>Add a new task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the form to create a new Task
        </DialogContentText>
        <Stack gap={1} paddingX={2}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Task title"
            fullWidth
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Task Description"
            fullWidth
            variant="standard"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              value={status}
              style={{
                flex: 1,
              }}
              id="status"
              onChange={(event) => setStatus(event.target.value)}
            >
              {Object.values(Status).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack flexDirection={'column'} alignItems={'center'} gap={1}>
            <TextField
              margin="dense"
              id="tags"
              name="tags"
              label="Tag"
              fullWidth
              variant="standard"
              value={tag}
              onKeyDown={(event) => {
                console.log('tag', tag);
                if (event.key === 'Enter') {
                  const trimmedTag = tag.trim();
                  if (!trimmedTag || tags.includes(trimmedTag)) {
                    setTag('');
                    return;
                  }
                  console.log('trimmedTag', trimmedTag);
                  setTags((prev) => [...prev, trimmedTag]);
                  setTag('');
                } else {
                  setTag((prev) => prev + event.key);
                }
              }}
            />
            {tags?.length > 0 && (
              <Stack flexDirection={'row'} gap={1} flexWrap={'wrap'}>
                {tags.map((tag) => (
                  <Chip
                    label={tag}
                    icon={
                      <CloseIcon
                        style={{
                          cursor: 'pointer',
                          color: 'red',
                        }}
                        onClick={() => {
                          setTags((prev) => prev.filter((t) => t !== tag));
                        }}
                      />
                    }
                  />
                ))}
              </Stack>
            )}
          </Stack>
          {!!projects && selectedProjectIndex != undefined && (
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              <InputLabel htmlFor="project">Project</InputLabel>
              <Select
                value={selectedProjectIndex}
                style={{
                  flex: 1,
                }}
                id="project"
                defaultValue={selectedProjectIndex}
                renderValue={(value) => {
                  return projects[value].name;
                }}
                onChange={(event) => {
                  setSelectedProjectIndex(Number(event.target.value));
                  setSelectedMilestoneIndex(undefined);
                  setAssignees([]);
                }}
              >
                {projects.map((project, index) => (
                  <MenuItem key={project.id} value={index}>
                    <Stack
                      direction={'row'}
                      style={{
                        width: '100%',
                      }}
                      gap={5}
                    >
                      <span>{project?.name} </span>
                      <span style={{ fontWeight: 'bold' }}>
                        {project.workspace?.name}
                      </span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          )}
          {projects &&
            selectedProjectIndex !== undefined &&
            selectedMilestoneIndex !== undefined && (
              <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                <InputLabel htmlFor="milestone">Milestone</InputLabel>
                <Select
                  value={selectedMilestoneIndex}
                  style={{
                    flex: 1,
                  }}
                  id="milestone"
                  renderValue={(value) => {
                    console.log('value here', value);
                    return projects[selectedProjectIndex]?.milestones[value]
                      ?.name;
                  }}
                  onChange={(event) => {
                    console.log('event.target.value', event.target.value);
                    setSelectedMilestoneIndex(Number(event.target.value));
                  }}
                >
                  {projects[selectedProjectIndex]?.milestones.map(
                    (milestone, index) => (
                      <MenuItem key={milestone.id} value={index}>
                        {milestone?.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Stack>
            )}
          {projects &&
            selectedProjectIndex !== undefined &&
            selectedMilestoneIndex !== undefined && (
              <Stack alignItems={'center'} gap={1}>
                <Autocomplete
                  id="assignees"
                  fullWidth
                  options={projects[selectedProjectIndex]?.userProjects.filter(
                    (userProject) =>
                      assignees.every((a) => a.id !== userProject.user.id)
                  )}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        margin="dense"
                        id="assignees"
                        name="assignees"
                        label="Assignees"
                        variant="standard"
                      />
                    );
                  }}
                  renderOption={(params, options) => {
                    console.log('options', options);
                    return (
                      <Box
                        {...params}
                        component="li"
                        onClick={() => {
                          setAssignees((prev) => [...prev, options.user]);
                        }}
                      >
                        <Stack direction={'row'} gap={1}>
                          <span> {options.user?.name}</span>
                          <span style={{ fontWeight: 'bold' }}>
                            {options.role}
                          </span>
                        </Stack>
                      </Box>
                    );
                  }}
                />
                <Stack>
                  {assignees.map((assignee) => (
                    <Stack
                      direction={'row'}
                      gap={1}
                      alignItems={'center'}
                      key={assignee.id}
                    >
                      <Typography>{assignee.name}</Typography>
                      <RxCross2
                        style={{
                          cursor: 'pointer',
                          color: 'red',
                        }}
                        onClick={() =>
                          setAssignees((prev) =>
                            prev.filter((a) => a.id !== assignee.id)
                          )
                        }
                      />
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
};
