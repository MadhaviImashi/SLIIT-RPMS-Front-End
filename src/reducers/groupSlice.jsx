import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    name: "",
    topic: "",
    members: [],
    panelMembers: [],
    id: "",
    topicState:"",
    supervisor:"",
    cosupervisor:"",
    memberWorks:"",
    description:""

  },
  reducers: {
    save: (state, action) => {
      state.id = action.payload.id;
      state.members = action.payload.members;
      state.name = action.payload.name;
      state.panelMembers = action.payload.panelMembers;
      state.topic = action.payload.topic;
      state.topicState = action.payload.topicState;
      state.supervisor = action.payload.supervisor;
      state.cosupervisor = action.payload.cosupervisor;
      state.memberWorks = action.payload.memberWorks;
      state.description = action.payload.description;
    },
    clear: (state) => {
      state.id = "";
      state.members = [];
      state.name = "";
      state.panelMembers = [];
      state.topic = "";
      state.topicState = "";
      state.supervisor = "";
      state.cosupervisor = "";
      state.memberWorks = "";
      state.description = "";
    },
  },
});

export const { save, clear } = groupSlice.actions;

export default groupSlice.reducer;
