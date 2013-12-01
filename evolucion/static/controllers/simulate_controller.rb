class SimulateController < ApplicationController
    
  def create
    @model_text = params[:model]
    model = Nokogiri::XML(@model_text)
    
    stock_and_flow = model.xpath("./model/stock_and_flow")
    
    elements =  { :par => {:el => 'parameter',  :group => 'parameters'},
                  :sto => {:el => 'stock',      :group => 'stocks'},
                  :flo => {:el => 'flow',       :group => 'flows'},
                  :aux => {:el => 'auxiliary',  :group => 'auxiliaries'},
                  :exo => {:el => 'exogenous',  :group => 'vars_exogenous'},
                  :del => {:el => 'delay',      :group => 'delays'},
                  :mul => {:el => 'multiplier', :group => 'multipliers'},
                  :fis => {:el => 'fis',        :group => 'vars_fis'},
                  :pre => {:el => 'previous',   :group => 'vars_previous'},
                  :sub => {:el => 'submodel',   :group => 'submodels'} 
                }
                    
    objects = {}
    
    elements.each do |k, els|
      objects[els[:group]] =  stock_and_flow.xpath("./"+els[:group])
      objects[els[:group]].xpath("./"+els[:el]).each do |el|
        puts '.....'
        puts el
        puts '.....'
      end
    end
    
    respond_to do |format|
      format.js {
        render 'refresh'
      }
    end  
  end
  
end
