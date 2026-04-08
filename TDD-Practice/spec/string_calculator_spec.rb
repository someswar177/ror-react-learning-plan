require 'rails_helper'

RSpec.describe "StringCalculator" do
  it "returns 0 for an empty string" do
    calculator = StringCalculator.new
    expect(calculator.add("")).to eq(0)
  end

  it "returns the number itself when single digit number is given" do
    calculator = StringCalculator.new
    expect(calculator.add("1")).to eq(1)
  end
end
