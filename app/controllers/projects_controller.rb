class ProjectsController < ApplicationController
  def index
    @project = Project.new
    respond_to do |format|
      flash[:notice] = 'Proyectos'
      flash[:success] = true
      format.html
    end
  end
  
  def create
    @project = Project.new(project_params)
    respond_to do |format|
      if @project.save
        flash[:notice] = 'El proyecto ha sido registrado satisfactoriamente'
        flash[:success] = true
        format.js{
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El proyecto no ha sido registrado'
        flash[:success] = false
        format.js{
          render :partial => 'refresh'
        }
      end
    end
  end
  
  private
  
  def project_params
    params[:project].permit(:title, :description, :author, :keywords)                  
  end
end
