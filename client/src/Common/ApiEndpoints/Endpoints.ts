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

export {ProjectEndpoints,AuthEndpoints}
