class StringCalculator
    def add(input)
        return 0 if input.empty?
        return input.to_i if input.length == 1
        delimiter = /[,\n]/ 
        if input.start_with?("//")
            header, input = input.split("\n", 2)
            if header.start_with?("//[") && header.end_with?("]")
                delimiter = header[3..-2]
            else
                delimiter = header[2]
            end
        end
        numbers = input.split(delimiter)
        sum = 0
        negatives = []
        for number in numbers
            if number.to_i < 0
                negatives << number.to_i
            elsif number.to_i <= 1000
                sum += number.to_i
            end
        end
        if negatives.any?
            raise "negatives not allowed: #{negatives.join(" ")}"
        end
        return sum
    end
end