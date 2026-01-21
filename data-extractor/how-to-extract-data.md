How to Dump Project Zomboid Data
This guide explains how to use the 
ZomboidDataDumper.lua
 script to extract Traits and Professions data from Project Zomboid.

1. The Script (
ZomboidDataDumper.lua
)
Save the following code as a file named 
ZomboidDataDumper.lua
:

-- ZomboidDataDumper.lua
-- Dumps Traits and Professions data to console and file
local function safeGet(func)
    local status, result = pcall(func)
    if status then return result else return nil end
end
local function dumpData()
    print("[DATA_DUMP] Starting Data Dump...")
    
    local output = {}
    table.insert(output, "=== TRAITS DATA ===")
    
    local traits = CharacterTraitDefinition.getTraits()
    for i=0, traits:size()-1 do
        local trait = traits:get(i)
        
        local typeVal = safeGet(function() return trait:getType() end) or "N/A"
        local costVal = safeGet(function() return trait:getCost() end) or "0"
        local labelVal = safeGet(function() return trait:getLabel() end) or "N/A"
        local descVal = safeGet(function() return trait:getDescription() end) or ""
        
        -- Icon / Texture
        local iconVal = safeGet(function() return trait:getTextureName() end) or 
                        safeGet(function() return trait:getTexture() end) or 
                        safeGet(function() return trait:getIcon() end) or "N/A"
        local traitData = string.format("Trait: %s | Cost: %s | Label: %s | Desc: %s | Icon: %s",
            tostring(typeVal),
            tostring(costVal),
            tostring(labelVal),
            descVal:gsub("\n", " "):gsub("\r", ""),
            tostring(iconVal)
        )
        
        -- Mutually Exclusive Traits (Safe extraction)
        local exclusives = safeGet(function() return trait:getMutuallyExclusiveTraits() end)
        if exclusives and type(exclusives) ~= "string" and safeGet(function() return exclusives.size end) then
            local size = safeGet(function() return exclusives:size() end) or 0
            for j=0, size-1 do
                 local exName = safeGet(function() return exclusives:get(j) end)
                 if exName then
                    traitData = traitData .. string.format(" | Exclude: %s", tostring(exName))
                 end
            end
        end
        -- XP Boosts
        local xpBoosts = safeGet(function() return trait:getXpBoosts() end)
        if xpBoosts then
             local kahluaTable = transformIntoKahluaTable(xpBoosts)
             for perk, level in pairs(kahluaTable) do
                traitData = traitData .. string.format(" | XP: %s=%d", tostring(perk), level:intValue())
             end
        end
        table.insert(output, traitData)
    end
    
    table.insert(output, "\n=== PROFESSIONS DATA ===")
    local professions = CharacterProfessionDefinition.getProfessions()
    for i=0, professions:size()-1 do
        local prof = professions:get(i)
        
        -- Try multiple possible naming conventions safely
        local typeVal = safeGet(function() return prof:getType() end) or "N/A"
        local nameVal = safeGet(function() return prof:getName() end) or safeGet(function() return prof:getLabel() end) or "N/A"
        local costVal = safeGet(function() return prof:getCost() end) or "N/A" -- Professions might not have cost, but points
        local pointsVal = safeGet(function() return prof:getPoints() end) or "N/A"
        local iconVal = safeGet(function() return prof:getTextureName() end) or 
                        safeGet(function() return prof:getTexture() end) or 
                        safeGet(function() return prof:getIcon() end) or "N/A"
        
        local profData = string.format("Profession: %s | Name: %s | Cost: %s | Points: %s | Icon: %s",
            tostring(typeVal),
            tostring(nameVal),
            tostring(costVal),
            tostring(pointsVal),
            tostring(iconVal)
        )
        
        local desc = safeGet(function() return prof:getDescription() end)
        if desc then
             profData = profData .. " | Desc: " .. desc:gsub("\n", " "):gsub("\r", "")
        end
        
        -- Granted Traits (was incorrectly getFreeTraits)
        local grantedTraits = safeGet(function() return prof:getGrantedTraits() end)
        if grantedTraits then
            for j=0, grantedTraits:size()-1 do
                local tName = safeGet(function() return grantedTraits:get(j) end)
                if tName then
                    profData = profData .. string.format(" | GrantedTrait: %s", tostring(tName))
                end
            end
        end
        -- XP Boosts
        local xpBoosts = safeGet(function() return prof:getXpBoosts() end)
        if xpBoosts then
             local kahluaTable = transformIntoKahluaTable(xpBoosts)
             for perk, level in pairs(kahluaTable) do
                profData = profData .. string.format(" | XP: %s=%d", tostring(perk), level:intValue())
             end
        end
        table.insert(output, profData)
    end
    
    print("[DATA_DUMP] Processing complete. Writing to file...")
    -- Try to write to file
    local fileWriter = getFileWriter("ZomboidDataDump.txt", true, false)
    if fileWriter then
        for _, line in ipairs(output) do
            local cleanLine = line:gsub("\n", "") -- ensure no embedded newlines
            fileWriter:write(cleanLine .. "\r\n")
            print("[DATA_DUMP] " .. cleanLine) -- Also print to console
        end
        fileWriter:close()
        print("[DATA_DUMP] Successfully wrote to ZomboidDataDump.txt")
    else
        print("[DATA_DUMP] Failed to create file writer. Dumping to console only.")
        for _, line in ipairs(output) do
            print("[DATA_DUMP] " .. line)
        end
    end
end
-- Hook into game start
Events.OnGameBoot.Add(dumpData)
2. Where to Put It
Locate your Project Zomboid Installation:

Steam (Windows): C:\Program Files (x86)\Steam\steamapps\common\ProjectZomboid
Steam (Mac): ~/Library/Application Support/Steam/steamapps/common/ProjectZomboid/Project Zomboid.app/Contents/Java
Steam (Linux): ~/.steam/steam/steamapps/common/ProjectZomboid/projectzomboid
Navigate to the Lua Client Folder:

Go to media/lua/client/.
Place the File:

Copy your ZomboidDataDumper.lua file into this folder.
3. How to Run It
Start Project Zomboid.
The script runs automatically safely during the "Game Boot" phase (loading screen).
Find the Dump file:
Go to your User Directory (where saves and logs are kept).
Windows: C:\Users\<YourUser>\Zomboid
Mac: ~/Zomboid
Linux: ~/Zomboid
Look for a file named ZomboidDataDump.txt.
