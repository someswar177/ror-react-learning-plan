require 'rails_helper'

RSpec.describe "FizzBuzz" do
  it "returns 'fizz' when passed 3" do
    fizz_buzz = FizzBuzz.new
    expect(fizz_buzz.calculate(3)).to eq("fizz")
  end
end
