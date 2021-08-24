import * as React from 'react'


interface Props {
  openNewProjectModal: React.MouseEventHandler<HTMLButtonElement>
}

// eslint-disable-next-line arrow-body-style
const ProjectsMenu: React.FC<Props> = ({ openNewProjectModal }) => {
  return (
    <div className="page-menu pt40">
      <button
        type="button"
        className="d-b m0a"
        onClick={openNewProjectModal}
      >
        Add project
      </button>


      <div className="section-title mt30 pt5 mb8">Search</div>


      <div className="section-title mt30 pt5 mb8">High priority tasks</div>




      {/* <form onSubmit={handleSubmit(onSubmit)} className="pl10">
        <div className="row">
          <label htmlFor="startDate">Date from</label>
          <input {...register('startDate')}
            id="startDate" name="startDate" required
          />
        </div>

        <div className="row">
          <label htmlFor="endDate">Date to</label>
          <input  {...register('endDate')}
            id="endDate" name="endDate" required
          />
        </div>

        <div className="form-button">
          <button type="submit" disabled={isSubmitting}>Filter</button>
        </div>
      </form> */}
    </div>
  )
}

export default ProjectsMenu
