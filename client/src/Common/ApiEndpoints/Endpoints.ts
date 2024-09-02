const ProjectEndpoints = {
  getAllProject: (accountId:number) => {
    return `projects/${accountId}`;
  },
  getProjectById:(accountId:number,projectId:number)=>{
    return `projects/${accountId}/${projectId}`
  },
  createProject:(accountId:number)=>{
    return `projects/${accountId}`
  },
  updateProject:(accountId:number,projectId:number)=>{
    return `projects/${accountId}/${projectId}`
  },
  deleteProject:(accountId:number,projectId:number)=>{
    return `projects/${accountId}/${projectId}`
  },
};

const AuthEndpoints={
  createAccount:()=>{
    return 'auth/create-account'
  },
  login:()=>{
    return `auth/login`
  },
  verifyToken:()=>{
    return 'auth/verifytoken'
  },
  logout:()=>{
    return 'auth/logout'
  }
}

const TaskEndpoints={
  getAllTasks:(projectId:number)=>{
    return `deadline/${projectId}`
  },
  getTaskById:(deadlineId:number,projectId:number)=>{
    return `deadline/${deadlineId}/${projectId}`
  },
  createTask:(projectId:number)=>{
    return `deadline/${projectId}`
  },
  updateTask:(deadlineId:number,projectId:number)=>{
    return `deadline/${deadlineId}/${projectId}`
  },
  deleteTask:(deadlineId:number,projectId:number)=>{
    return `deadline/${deadlineId}/${projectId}`
  }
}

const DashboardEndpoints={
  getUpcommingDeadlines:(accountId:number)=>{
    return `projects/${accountId}/upcommingdeadlines`
  }
}

export {ProjectEndpoints,AuthEndpoints,TaskEndpoints,DashboardEndpoints}
