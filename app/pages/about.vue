<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Cassowary : Wuthering Waves Planner</h1>
	</section>
	<section>
		<div>
			<div>
				if you found any bugs or have some suggestions, please create issue on
				the repository https://github.com/boxofzero/cassowary or you can contact
				me on twitter/discord @boxofzero .
			</div>
			<br />
			<div>
				thanks to seelie.me for the inspiration. you are the goat of gacha game
				planner.
			</div>
			<div>
				thanks to wutheringwaves.gg and dim's wutheringdata for all the data
			</div>
			<br />
			<div>
				This site does not affiliate with KURO GAMES. Wuthering Waves game and
				its assets belong to KURO GAMES.
			</div>
			<br />
			<div>about the design (updated at 24/08/01):</div>
			<p>
				originally i want to make this as close as seelie.me , but then I wanted
				to use this as quickly as possible, so I made the design like this: more
				like 1 dimensional planner. From the dropdown of character/weapon I
				directly set target. Maybe I will change it, maybe not. Depends on the
				time I have.
			</p>
			<p>
				the next major feature I consider to add is: free text notes and custom
				character/weapon. notes should be simpler to add and I think it is
				important enough. I like the seelie.me task note design, especially the
				recurring feature.
			</p>
			<br />

			<div>random trivia</div>
			<div>char_exp : credit_to_level = 1 : 0,35</div>
			<div>
				weapon_exp : credit_to_level = 1 : 0,4 (allegedly. CMIIW . The
				calculation kinda funky)
			</div>
			<br />
			<div>
				about echo levelling: (CMIIW , i may need to check more in-game)
			</div>
			<div>
				to level 5-star echo from 1 to 25, you need around 29 Premium Sealed
				Tube
			</div>
			<div>
				at sol3 rank 6, each run at tacet field you can get at least 3 Premium
				Sealed Tube and 3 Advanced Sealed Tube, which is valued as 1.2 Premium
				Sealed Tube, so total is 4.2 Premium Sealed Tube. (if lucky you can get
				4-4)
			</div>
			<div>so you need to do 7 runs to get 29 Premium Sealed Tube</div>
			<div>7 runs = 420 energy = 1.75 days = 4x a week</div>
			<div>each run also gives 20 premium tuner</div>
			<div>need 50 tuner to 5x tune 1 echo</div>
			<div>so you need to do 2.5 runs to get 50 tuner</div>
			<div>2.5 runs = 150 energy = 0,625 days = 11,2x a week</div>
			<div>
				so in a week you can level at least 4 echoes and max tune 11 echoes
			</div>
			<div>
				(obviously this doesn't count tube and tuner you get from dailies, bp,
				event, etc)
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	</section>

	<section>
		<div>TODO</div>
		<div>improv:</div>
		<div>
			character/weapon page: show current item needed and global item needed
		</div>
		<div>improve exp to be calc-ed similar to tiered materials</div>
		<div>new feature:</div>
		<div>add custom text notes</div>
		<div>add backup and restore local storage data</div>
		<div>sort by in-game: sort by rarity, category? a-z?</div>
		<div>try google drive client api if it's actually possible</div>
		<div>idk</div>
		<div>learn css/tailwind mayb</div>
	</section>
</template>

<script setup></script>
