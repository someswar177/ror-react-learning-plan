class StringCalculator
    def add(input)
        return 0 if input.empty?
        return input.to_i if input.length == 1
        return input[0].to_i + input[2].to_i
    end
end