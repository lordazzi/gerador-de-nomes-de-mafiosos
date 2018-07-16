enum NameType {
	NAME = 0,
	NICKNAME = 1
}

class NamelizeStore {
	public static names = [
		'John', 'Lenny', 'Jimmy', 'George', 'Marco', 'Matteo', 'Antonio', 'Pietro', 'Carlo',
		'Pierre', 'Adalberto', 'Angelo', 'Domenico', 'Emilio', 'Franco', 'Giuliano', 'Lazzaro',
		'Marcello', 'Ottavio', 'Paolo', 'Renzo', 'Victor', 'Ivan', 'Pietro', 'Alfonse', 'Giovanni'
	];

	public static middleName = [
		'B.', 'D.', 'F.', 'G.', 'J.', 'L.', 'P.', 'R.', 'S.', 'T.', 'V.', 'de', 'el', 'van',
		'de la'
	];

	public static surnames = [
		'Thompson', 'Milano', 'Colombo', 'Gallo', 'Teodoro', 'Sirguei', 'Sillas', 'Domingos',
		'Planisola', 'Authier', 'Lorenzo', 'Sebastiano', 'Salvatore', 'Valentino', 'Vitale',
		'Polca', 'Stanislawa'
	];

	public static nicknameStartWith = [
		'Red', 'Big', 'Mister', 'Cold', 'Evil', 'The Great', 'Smart', 'Knocking', 'Suppliant',
		'Terrible', 'Infinite', 'Antonished', 'The Son of', 'Sowise', 'Unknown', 'Knight of'
	];

	public static nicknameEndWith = [
		'Hat', 'Dog', 'Killer', 'Wall', 'Joe', 'Rabbit', 'Worker', 'Door', 'Survivor', 'Gate',
		'Shoot', 'War', 'Darkness', 'Norwegian'
	];
}

class Randomize {
	private static instance: Randomize;
	static getInstance() {
		if (!this.instance) {
			this.instance = new Randomize();
		}

		return this.instance;
	}

	random(to: number, from = 0): number {
		return Math.round(Math.random() * to) + from;
	}

	randomBoolean(): boolean {
		return !!this.random(1);
	}

	fromArray<T>(array: Array<T>): T {
		return array[this.random(array.length - 1)];
	}
}

class NamelizeService {

	public randomize = Randomize.getInstance();

	create(): string {
		const type = <NameType>this.randomize.random(1);
		if (type === NameType.NAME) {
			return this.createName();
		} else if (type === NameType.NICKNAME) {
			return this.createNickname();
		}
	}

	private createName(): string {
		const useAbbreviation = this.randomize.randomBoolean();
		let name = this.randomize.fromArray(NamelizeStore.names);
		if (useAbbreviation) {
			name += ' ' + this.randomize.fromArray(NamelizeStore.middleName);
		}

		name += ' ' + this.randomize.fromArray(NamelizeStore.surnames);

		return name;
	}

	private createNickname(): string {
		let nickname = this.randomize.fromArray(NamelizeStore.nicknameStartWith);
		nickname += ' ' + this.randomize.fromArray(
			[].concat(
				NamelizeStore.nicknameEndWith
			).concat(
				NamelizeStore.names
			).concat(
				NamelizeStore.surnames
			)
		);

		return nickname;
	}
}
