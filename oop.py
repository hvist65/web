class Berry:

    def __init__(self,data):
            block = [item.strip() for item in data.strip().split("|")]

            self.name = block[0]
            self.color = block[1]
            self.vitamins = [i for i in block[2].split(",")]



class Compote:
    def __init__(self,name,berries):
        self.name = name
        self.berries = berries

    def __lt__(self,other):
        if len(self.berries) != len(other.berries):
            return len(self.berries) < len(other.berries)  

        return self.name < other.name
    
    def Description(self,compotes):
        for compote in compotes:
            print(compote.name)
            print(", ".join(berry.name for berry in self.berries))

    def Vitamins(self,compotes):
        for compote in compotes:
            vitamins = []
            print(compote.name)
            for berry in compote.berries:
                vitamins+=berry.vitamins
            print(sorted(set(vitamins)))
            
berry = Berry("Blueberry | blue | A,C,E")
print(berry.color)
print(berry.vitamins)
compote = Compote("lis",[berry,berry])
print()
compote.Description([compote,compote])
print()
compote.Vitamins([compote,compote])
[compote].sort()