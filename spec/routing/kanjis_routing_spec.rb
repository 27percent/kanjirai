require "spec_helper"

describe KanjisController do
  describe "routing" do

    it "routes to #index" do
      get("/kanjis").should route_to("kanjis#index")
    end

    it "routes to #new" do
      get("/kanjis/new").should route_to("kanjis#new")
    end

    it "routes to #show" do
      get("/kanjis/1").should route_to("kanjis#show", :id => "1")
    end

    it "routes to #edit" do
      get("/kanjis/1/edit").should route_to("kanjis#edit", :id => "1")
    end

    it "routes to #create" do
      post("/kanjis").should route_to("kanjis#create")
    end

    it "routes to #update" do
      put("/kanjis/1").should route_to("kanjis#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/kanjis/1").should route_to("kanjis#destroy", :id => "1")
    end

  end
end
