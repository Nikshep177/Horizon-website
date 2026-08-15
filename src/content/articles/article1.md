---
title: "Semiconductors"
author: "Horizon"
date: "2024-12-20"
tags: ["physics", "semiconductors", "space"]
image: "/assets/images/semi.png"
---
# Semiconductors

Semiconductors are at the heart of modern technology, with their presence being ubiquitous 
and manufacture, vital. The manufacture, however, is subject to the physical constraints of 
the Earth, with convection chief amongst them, due to gravity, reducing the quality of the 
crystal which one can manufacture here. 

Whilst attempts have been made so far to reduce the effects of such processes, the situation, 
to a few people, begged the question: why don’t we manufacture semiconductors outside the 
Earth? 

## A Factory in Orbit

In 2025, Space Forge, a company with the ultimate aim of setting up an autonomous factory 
in orbit, launched ForgeStar-1, a satellite carrying a miniature, remotely-operable furnace. 
This was activated in December, reaching a temperature of around 1,000 °C and generating 
plasma, demonstrating the concept’s plausibility.
## Why Leave the Planet?
There are a multitude of reasons behind the desire to manufacture semiconductors. The first 
and foremost is microgravity. The absence of gravity prevents the buoyancy-driven 
convection visible on Earth, where hot fluid rises and the colder sinks, developing currents 
which transfer impurities along them. This results in uneven depositions of the dopants across 
the melt.

In order to quantify the conditions under which such a process occurs, the dimensionless 
Rayleigh number is used, as written below: 

$$
Ra = \frac{g \cdot \beta \cdot \Delta T \cdot L^{3}}{\nu \cdot \alpha}
$$

where 𝑔 is gravitational acceleration, 𝛽is the thermal expansion coefficient of the melt, Δ𝑇is 
the characteristic temperature difference across the melt, 𝐿 is a length scale, 𝜈 is the kinematic 
viscosity, and 𝛼is the thermal diffusivity. Should it cross a certain threshold, of the order 103, 
conduction is no longer the sole source of heat transfer: rather, convection takes on a 
dominant role. In typical manufacturing processes, it often is higher than 105, resulting in, if 
adequate measures are not taken, major effects to the grown crystals, such as striations, 
microscopic oscillations in dopant concentration corresponding to their flow. This is 
mathematically quantified by the segregation co-efficient, the ratio of the concentration of a 
substance in the solid phase to that in the liquid phase, written as: 
$$
k = \frac{c_s}{c_l}
$$
A value of unity indicates that there is no preferential incorporation of the dopant into either 
phase. If k<1, on the other hand, there is a higher concentration of the solute at the interface 
than further away. Furthermore, the uneven distribution of dopant material results in the 
formation of various types of defects, such as point defects, like vacancies, substitutional 
impurities or an interstitial defect. These introduce energy states within the bandgap, acting as 
a centre for recombination, which is described by the Shockley-Read-Hall Theory: 
$$
U = \frac{np - n_i^2}{\tau_p (n + n_1) + \tau_n (p + p_1)}
$$
Due to an increase in recombination, the life-time of carriers is reduced, leading to a loss of 
efficiency. These striations and defects, for example, can reduce solar panel efficiency by up 
to 1%.
## Microgravity and its Advantages:
In space, one can observe that, through the Rayleigh number, buoyancy-driven convection is 
vastly reduced via the decrease in the effective value in g. This causes an increase in the 
purity of the produced material, with Space Forge claiming to be able to produce 
semiconductors which are up to 4,000 times purer. There are a few additional factors for the 
higher purity, such as a lack of sedimentation, as in the absence of gravity, heavier particles 
do not tend to settle at the bottom of the container. Combined with diffusion being the main 
source of transportation, it results in near-homogeneous crystals being formed, as 
demonstrated by various experiments carried out in space, such as the Wake Shield Facility, 
which aimed to produce thin films of gallium arsenide in Low Earth Orbit. 

There are, however, a few issues which prevent perfect crystals from being manufactured in 
space, such as surface tension-driven convection, called the Marangoni effect: the difference 
in temperatures between the various layers of the fluid causes a gradient in surface tension to 
form, generating convection cells. This is expressed as:  
$$
Ma = \frac{\left|\frac{d\sigma}{dT}\right| \Delta T \, L}{\mu \alpha}
$$
Furthermore, the cost of launching and retrieving material from orbit remains prohibitively 
expensive, as is ensuring the safety of the returned material, rendering the cost-effectiveness 
of the project in question, even if it is intriguing. 

## The next steps
Whilst the current satellite may not return to Earth, the second mission: ForgeStar-2, aims to 
demonstrate the capability to return material safely by the deployment of a heat shield during 
re-entry, paving the way for establishing routine flights to manufacture semiconductors in 
orbit, allowing small, re-usable satellites to act as steady sources of the material so needed in 
today’s world.
