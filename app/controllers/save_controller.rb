class SaveController < ApplicationController
  
  def create
    @model_text = params[:model]
    @model = Nokogiri::XML(@model_text).xpath('./model')
    
    id = @model.attr('id').text
    begin
      @project = Project.find(id)
    rescue ActiveRecord::RecordNotFound => e
      @project = nil
    end
    
    @stateProject = false
    
    if @project
      @project.update_attributes(:model => @model_text)
      @stateProject = @project.save
    end
    
    #statePro = saveProse()
    #stateInf = saveInfluence()
    #stateFyn = saveStockAndFlow()
    
    respond_to do |format|
      format.js {
        flash[:notice] = 'Proyecto guardado satisfactoriamente'
        flash[:success] = true
        render 'refresh'
      }
    end  
  end
  
  private
  
  def saveProse
    begin
      prose = @project.prose
      prose_xml = @model.xpath("./prose")
      puts '+++++++++++++'
      puts prose_xml.to_s
      puts '+++++++++++++'
      
      title = prose_xml.at_xpath("./title").text
      description = prose_xml.at_xpath("./description").text
          
      unless prose
        prose = Prose.new({:title => title, :description => description, :project_id => @project.id})
      else
        prose.update_attributes(:title => title, :description => description)
      end    
      prose.save
      return true
    rescue
      return false
    end
  end
  
  def saveInfluence
    begin
      influence = @project.influence
      influence_xml = @model.xpath("./influence")
      width = influence_xml.attr('width').text
      height = influence_xml.attr('height').text
            
      unless influence
        influence = Influence.new({:width => width, :height => height, :project_id => @project.id})
      else
        influence.update_attributes(:width => width, :height => height)
      end
      influence.save
      
      concepts_xml = influence_xml.xpath("./concepts")
      concepts = concepts_xml.xpath("./concept")
      
      els = ElementInf.where(:influence_id => influence.id.to_s)
      els.destroy_all
      
      concepts.each{ |concept|
        name = concept.at_xpath("./name").text
        title = concept.at_xpath("./title").text
        description = concept.at_xpath("./description").text
        units = concept.at_xpath("./units").text
        pos_x = concept.at_xpath("./position/x").text
        pos_y = concept.at_xpath("./position/y").text      
        
        el = ElementInf.new({
          :name         =>  name,
          :type_el      =>  'concept',
          :title        =>  title,
          :description  =>  description,
          :units        =>  units,
          :pos_x        =>  pos_x,
          :pos_y        =>  pos_y,
          :influence_id =>  influence.id
        })
        el.save
      }
      
      rels = RelationInf.where(:influence_id => influence.id.to_s)
      rels.destroy_all
      
      relations_type = ['material', 'information']
      
      relations_type.each{ |rel_type|
        
        relations_xml = influence_xml.xpath("./"+rel_type+"_relations")
        relations = relations_xml.xpath("./relation")
        
        relations.each{ |relation|
          origin = relation.at_xpath("./origin").text
          destination = relation.at_xpath("./destination").text
          description = relation.at_xpath("./description").text
          po_x  = relation.at_xpath("./position/po/x").text
          po_y  = relation.at_xpath("./position/po/y").text
          pco_x = relation.at_xpath("./position/pco/x").text
          pco_y = relation.at_xpath("./position/pco/y").text
          pd_x  = relation.at_xpath("./position/pd/x").text
          pd_y  = relation.at_xpath("./position/pd/y").text
          pcd_x = relation.at_xpath("./position/pcd/x").text
          pcd_y = relation.at_xpath("./position/pcd/y").text
          
          el_origin = ElementInf.where(:name => origin, :influence_id => influence.id.to_s)
          el_destination = ElementInf.where(:name => destination, :influence_id => influence.id.to_s)
          
          rel = RelationInf.new({
            :type_rel       =>  rel_type, 
            :origin_id      =>  el_origin.first.id, 
            :destination_id =>  el_destination.first.id, 
            :influence_id   =>  influence.id,
            :description    =>  description,
            :po_x           =>  po_x,
            :po_y           =>  po_y, 
            :pco_x          =>  pco_x,
            :pco_y          =>  pco_y,
            :pd_x           =>  pd_x,
            :pd_y           =>  pd_y,
            :pcd_x          =>  pcd_x,
            :pcd_y          =>  pcd_y
          })
          puts rel.save
        }
      }
      
      return true
    rescue
      return false
    end
  end
  
  def saveStockAndFlow
    begin
      
    rescue
      
    end  
  end
  
  def saveEquations
    begin
      
    rescue
      
    end  
  end
  
  def saveBehavior
    begin
      
    rescue
      
    end  
  end
  
  def model_params
    params[:model].permit()                  
  end
end
