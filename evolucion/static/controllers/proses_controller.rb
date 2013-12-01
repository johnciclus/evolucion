class ProsesController < ApplicationController
  def index
    @prose = Prose.new
    respond_to do |format|
      format.html  
    end
  end
  def create
    @prose = Prose.new(prose_params)
    respond_to do |format|
      if @prose.save
        flash[:notice] = 'El modelo en lenguaje prosa ha sido registrado satisfactoriamente'
        flash[:success] = true
      else
        flash[:notice] = 'El modelo en lenguaje prosa no ha sido registrado'
        flash[:success] = false
      end
      format.js{
          render :partial => 'refresh'
      }
    end
  end
  
  private
  
  def prose_params
    params[:prose].permit(:title, :description)                  
  end
end
