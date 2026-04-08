require 'rails_helper'

RSpec.describe "StringCalculator" do
  let(:calculator) { StringCalculator.new }

  it "returns 0 for an empty string" do
    expect(calculator.add("")).to eq(0)
  end

  it "returns the number itself when single digit number is given" do
    expect(calculator.add("1")).to eq(1)
  end

  it "returns 3 for sum of two numbers(1,2) separated by default delimiter ( , )" do
    expect(calculator.add("1,2")).to eq(3)
  end

  it "returns 6 for sum of three numbers(1,2,3) separated by default delimiter ( , )" do
    expect(calculator.add("1,2,3")).to eq(6)
  end

  it "returns the number 123 itself when a multi-digit number 123 is given" do
    expect(calculator.add("123")).to eq(123)
  end

  it "handles newline as delimiter between numbers" do
    expect(calculator.add("1\n2,3")).to eq(6)
  end

  it "supports custom single-character delimiter defined in the first line" do
      expect(calculator.add("//;\n1;2")).to eq(3)
  end

  it "raises an exception for a single negative number" do
    expect { calculator.add("1,-2,3") }.to raise_error("negatives not allowed: -2")
  end

  it "raises an exception for multiple negative numbers" do
    expect { calculator.add("1,-2,-3") }.to raise_error("negatives not allowed: -2 -3")
  end

  it "ignores numbers greater than 1000" do
    expect(calculator.add("1,2,1001")).to eq(3) 
    expect(calculator.add("1,2,1000")).to eq(1003) 
  end

  it "supports multi-character delimiters wrapped in square brackets" do
    expect(calculator.add("//[***]\n1***2***3")).to eq(6)
  end

  it "supports multiple single-character delimiters like //[*][%]\n1*2%3" do
    expect(calculator.add("//[*][%]\n1*2%3")).to eq(6)
  end

  it "supports multiple delimiters of variable length like //[***][%%%]\n1***2%%%3" do
    expect(calculator.add("//[***][%%%]\n1***2%%%3")).to eq(6)
  end

  it "supports multiple delimiters of variable length like //[foo][bar]\n1foo2bar3" do
    expect(calculator.add("//[foo][bar]\n1foo2bar3")).to eq(6)
  end
end
