"use client";

import { ChevronRightIcon, CheckIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button";

type DemoProps = {
	onClick?: () => void;
};

export function AnimatedSubscribeButtonDemo({ onClick }: DemoProps): JSX.Element {
	return (
		<AnimatedSubscribeButton
			buttonColor="#000000"
			buttonTextColor="#ffffff"
			subscribeStatus={false}
			initialText={
				<span className="group inline-flex items-center">
					下载
					<ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
				</span>
			}
			changeText={
				<span className="group inline-flex items-center">
					<CheckIcon className="mr-2 size-4" />
					已下载
				</span>
			}
			onClick={onClick}
		/>
	);
}


