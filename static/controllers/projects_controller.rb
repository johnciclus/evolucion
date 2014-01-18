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
      else
        flash[:notice] = 'El proyecto no ha sido registrado'
        flash[:success] = false
      end
      format.js{
        render :partial => 'refresh'
      }
    end
  end
    
  def show
    begin
      @project = Project.find(params[:id])
    rescue
      @project = nil
    end
    
    respond_to do |format|
      if @project
        flash[:notice] = 'Abriendo proyecto'
        flash[:success] = true
      else
        flash[:notice] = 'No se encontro el proyecto solicitado'
        flash[:success] = false
      end
      format.html
    end
  end
  
  def edit
    
  end
  
  def update
    
  end
  
  def destroy
    
  end
    
  private
  def project_params
    params[:project].permit(:title, :description, :author, :keywords, :model)                  
  end
end
