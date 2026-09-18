---
class: py-10
glowSeed: 123
---

# Animated Boxes

<span>Subtitle</span>

<div mt-4 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="1 solid yellow-200/40" bg="yellow-50/40"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:cics-program text-yellow-600 h-20 w-20 />
    </div>
    <div bg="yellow-100/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-gray-800>
      <span>Code</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="1 solid lime-200/40" bg="lime-50/40"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-bi:gpu-card text-lime-600 h-20 w-20 />
    </div>
    <div bg="lime-100/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-gray-800>
      <span>CUDA</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="1 solid emerald-200/40" bg="emerald-50/40"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:terminal text-emerald-600 h-20 w-20 />
    </div>
    <div bg="emerald-100/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-gray-800>
      <span>System Library</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="1 solid sky-200/40" bg="sky-50/40"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:row-delete text-sky-600 h-20 w-20 />
    </div>
    <div bg="sky-100/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-gray-800>
      <span>Packages</span>
    </div>
  </div>
</v-clicks>

</div>

<div v-click flex flex-col mt-4 bg="red-100/30" border="1 solid red-200/40" rounded-lg>
  <div bg="red-100/30" px-4 py-2 text-red-700 flex items-center>
    <div i-carbon:warning-alt mr-2 /> Impact
  </div>
  <div flex justify-between px-6 py-4 text-sm text-gray-800>
    <div flex items-center gap-2>
      <div i-carbon:time text-red-600 text-xl />
      <span>A</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:chart-evaluation text-red-600 text-xl />
      <span>B</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:cloud-service-management text-red-600 text-xl />
      <span>C</span>
    </div>
  </div>
</div>