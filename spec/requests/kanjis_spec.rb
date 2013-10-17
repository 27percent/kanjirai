require 'spec_helper'

describe "Kanjis" do
  describe "GET /kanjis" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get kanjis_path
      response.status.should be(200)
    end
  end
end
