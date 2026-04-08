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

  it "returns 3 for sum of two numbers(1,2) separated by default delimiter ( , )" do
    calculator = StringCalculator.new
    expect(calculator.add("1,2")).to eq(3)
  end

  it "returns 6 for sum of three numbers(1,2,3) separated by default delimiter ( , )" do
    calculator = StringCalculator.new
    expect(calculator.add("1,2,3")).to eq(6)
  end

  it "returns the number 123 itself when a multi-digit number 123 is given" do
    calculator = StringCalculator.new
    expect(calculator.add("123")).to eq(123)
  end

  it "handles newline as delimiter between numbers" do
    calculator = StringCalculator.new
    expect(calculator.add("1\n2,3")).to eq(6)
  end

  it "supports custom single-character delimiter defined in the first line" do
      calculator = StringCalculator.new
      expect(calculator.add("//;\n1;2")).to eq(3)
  end

  it "raises an exception for a single negative number" do
    calculator = StringCalculator.new
    expect { calculator.add("1,-2,3") }.to raise_error("negatives not allowed: -2")
  end

  it "raises an exception for multiple negative numbers" do
    calculator = StringCalculator.new
    expect { calculator.add("1,-2,-3") }.to raise_error("negatives not allowed: -2 -3")
  end

  it "ignores numbers greater than 1000" do
    calculator = StringCalculator.new
    expect(calculator.add("1,2,1001")).to eq(3) 
  end

  it "supports multi-character delimiters wrapped in square brackets" do
    calculator = StringCalculator.new
    expect(calculator.add("//[***]\n1***2***3")).to eq(6)
  end

  it "supports multiple single-character delimiters like //[*][%]\n1*2%3" do
    calculator = StringCalculator.new
    expect(calculator.add("//[*][%]\n1*2%3")).to eq(6)
  end
end
